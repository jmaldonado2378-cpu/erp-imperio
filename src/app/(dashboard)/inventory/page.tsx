"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function InventoryPage() {
    const [items, setItems] = useState<any[]>([])
    const [isNewItemOpen, setIsNewItemOpen] = useState(false)
    const [isPurchaseOpen, setIsPurchaseOpen] = useState(false)
    const [newItem, setNewItem] = useState({ code: "", description: "", category: "Insumos", stock: 0, unit: "Kg" })
    const [purchase, setPurchase] = useState({ itemId: "", qty: "" })
    const [loading, setLoading] = useState(true)

    // Fetch Items from Supabase
    const fetchItems = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('insumos')
            .select('*')
            .order('id', { ascending: true })

        if (error) {
            console.error(error)
            toast.error("Error cargando inventario")
        } else {
            setItems(data || [])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchItems()
    }, [])

    const handleCreate = async () => {
        if (!newItem.code || !newItem.description) {
            toast.error("Complete todos los campos obligatorios")
            return
        }

        const { error } = await supabase
            .from('insumos')
            .insert([{
                code: newItem.code,
                description: newItem.description,
                category: newItem.category,
                // stock defaults to 0 if not provided or provided
                unit: newItem.unit
            }])

        if (error) {
            toast.error("Error al crear artículo: " + error.message)
        } else {
            toast.success("Artículo creado correctamente")
            setIsNewItemOpen(false)
            setNewItem({ code: "", description: "", category: "Insumos", stock: 0, unit: "Kg" })
            fetchItems() // Refresh list
        }
    }

    const handlePurchase = async () => {
        if (!purchase.itemId || !purchase.qty) {
            toast.error("Seleccione un item y cantidad")
            return
        }

        // Optimistic UI update or fetch? Let's do fetch for safety first.
        const currentItem = items.find(i => i.id.toString() === purchase.itemId)
        if (!currentItem) return

        const newStock = Number(currentItem.stock) + Number(purchase.qty)

        const { error } = await supabase
            .from('insumos')
            .update({ stock: newStock })
            .eq('id', purchase.itemId)

        if (error) {
            toast.error("Error al actualizar stock: " + error.message)
        } else {
            toast.success("Compra registrada. Stock actualizado.")
            setIsPurchaseOpen(false)
            setPurchase({ itemId: "", qty: "" })
            fetchItems()
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
                    <p className="text-muted-foreground">Gestión de existencias e insumos.</p>
                </div>

                <div className="flex gap-2">
                    <Dialog open={isPurchaseOpen} onOpenChange={setIsPurchaseOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Plus className="mr-2 h-4 w-4" /> Registrar Compra
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Registrar Compra (Entrada)</DialogTitle>
                                <DialogDescription>
                                    Ingrese los detalles de la factura de compra.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="item" className="text-right">Item</Label>
                                    <Select onValueChange={(v) => setPurchase({ ...purchase, itemId: v })}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Seleccionar..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {items.map(i => (
                                                <SelectItem key={i.id} value={i.id.toString()}>{i.description}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="qty" className="text-right">Cantidad</Label>
                                    <Input
                                        id="qty"
                                        type="number"
                                        className="col-span-3"
                                        value={purchase.qty}
                                        onChange={(e) => setPurchase({ ...purchase, qty: e.target.value })}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handlePurchase}>Confirmar Ingreso</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isNewItemOpen} onOpenChange={setIsNewItemOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Nuevo Artículo
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Crear Nuevo Artículo</DialogTitle>
                                <DialogDescription>
                                    Complete los datos del nuevo insumo o producto.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="code" className="text-right">Código</Label>
                                    <Input
                                        id="code"
                                        className="col-span-3"
                                        value={newItem.code}
                                        onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">Nombre</Label>
                                    <Input
                                        id="name"
                                        className="col-span-3"
                                        value={newItem.description}
                                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">Categoría</Label>
                                    <Select onValueChange={(v) => setNewItem({ ...newItem, category: v })}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Seleccionar..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Insumos">Insumos</SelectItem>
                                            <SelectItem value="Producción">Producción</SelectItem>
                                            <SelectItem value="Empaque">Empaque</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleCreate}>Guardar Artículo</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,234,567</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bajo Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-500">{items.filter(i => i.stock < 100).length} Items</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Categorías</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4 Activas</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Listado de Artículos</CardTitle>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filtrar</Button>
                            <Button variant="outline" size="sm"><ArrowUpDown className="mr-2 h-4 w-4" /> Ordenar</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Código</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead className="text-right">Stock Actual</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">Cargando inventario...</TableCell>
                                </TableRow>
                            ) : items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-mono font-medium">{item.code}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                            {item.category}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right font-bold">
                                        {item.stock} {item.unit}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/inventory/${item.id}`}>Ver</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </motion.div>
    )
}

