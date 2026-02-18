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
import { Plus, Search, Filter, ArrowUpDown, Archive } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function InventoryPage() {
    const [items, setItems] = useState<any[]>([])
    const [warehouses, setWarehouses] = useState<any[]>([])
    const [isNewItemOpen, setIsNewItemOpen] = useState(false)
    const [isPurchaseOpen, setIsPurchaseOpen] = useState(false)

    // New Item State (Extended)
    const [newItem, setNewItem] = useState({
        code: "",
        description: "",
        category: "Insumos",
        unit: "Kg",
        purchasing_unit: "Unidad",
        conversion_factor: "1"
    })

    // Purchase State (Now with Warehouse)
    const [purchase, setPurchase] = useState({
        itemId: "",
        warehouseId: "",
        qty: "0"
    })

    const [loading, setLoading] = useState(true)

    // Fetch Items (Aggregate View)
    const fetchGameData = async () => {
        setLoading(true)
        // 1. Fetch Stock View
        const { data: stockData, error: stockError } = await supabase
            .from('view_stock_total')
            .select('*')
            .order('id', { ascending: true })

        // 2. Fetch Warehouses for Selector
        const { data: whData } = await supabase
            .from('warehouses')
            .select('*')
            .order('id', { ascending: true })

        if (stockError) {
            console.error(stockError)
            toast.error("Error cargando inventario")
        } else {
            setItems(stockData || [])
            setWarehouses(whData || [])
            // Set default warehouse (Seco)
            const defaultWh = whData?.find(w => w.code === 'ALM-01-SEC')
            if (defaultWh) setPurchase(prev => ({ ...prev, warehouseId: defaultWh.id.toString() }))
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchGameData()
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
                unit: newItem.unit,
                purchasing_unit: newItem.purchasing_unit,
                conversion_factor: Number(newItem.conversion_factor)
            }])

        if (error) {
            toast.error("Error al crear artículo: " + error.message)
        } else {
            toast.success("Artículo creado correctamente")
            setIsNewItemOpen(false)
            setNewItem({
                code: "", description: "", category: "Insumos",
                unit: "Kg", purchasing_unit: "Unidad", conversion_factor: "1"
            })
            fetchGameData()
        }
    }

    const handlePurchase = async () => {
        if (!purchase.itemId || !purchase.qty || !purchase.warehouseId) {
            toast.error("Complete todos los datos de ingreso")
            return
        }

        // Find if record exists in inventory_levels
        const { data: existingLevel } = await supabase
            .from('inventory_levels')
            .select('*')
            .eq('insumo_id', purchase.itemId)
            .eq('warehouse_id', purchase.warehouseId)
            .single()

        let error;

        if (existingLevel) {
            // Update
            const newQty = Number(existingLevel.quantity) + Number(purchase.qty)
            const { error: upError } = await supabase
                .from('inventory_levels')
                .update({ quantity: newQty, last_updated: new Date().toISOString() })
                .eq('id', existingLevel.id)
            error = upError
        } else {
            // Insert
            const { error: inError } = await supabase
                .from('inventory_levels')
                .insert([{
                    insumo_id: purchase.itemId,
                    warehouse_id: purchase.warehouseId,
                    quantity: Number(purchase.qty)
                }])
            error = inError
        }

        if (error) {
            toast.error("Error al registrar entrada: " + error.message)
        } else {
            toast.success("Ingreso registrado en Almacén.")
            setIsPurchaseOpen(false)
            fetchGameData()
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
                    <h1 className="text-3xl font-bold tracking-tight">Inventario Global</h1>
                    <p className="text-muted-foreground">Visión agregada de todos los almacenes.</p>
                </div>

                <div className="flex gap-2">
                    <Dialog open={isPurchaseOpen} onOpenChange={setIsPurchaseOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Archive className="mr-2 h-4 w-4" /> Registrar Entrada (WMS)
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Recepción de Mercadería</DialogTitle>
                                <DialogDescription>
                                    Ingrese insumos al almacén específico.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="wh" className="text-right">Almacén Destino</Label>
                                    <Select
                                        value={purchase.warehouseId}
                                        onValueChange={(v) => setPurchase({ ...purchase, warehouseId: v })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Seleccionar Almacén..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {warehouses.map(w => (
                                                <SelectItem key={w.id} value={w.id.toString()}>{w.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="item" className="text-right">Item</Label>
                                    <Select onValueChange={(v) => setPurchase({ ...purchase, itemId: v })}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Seleccionar insumo..." />
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
                                        placeholder="Unidad Base"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handlePurchase}>Confirmar Recepción</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isNewItemOpen} onOpenChange={setIsNewItemOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Nuevo SKU
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Alta de Insumo (Maestro)</DialogTitle>
                                <DialogDescription>
                                    Defina las unidades de compra y consumo.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Código</Label>
                                    <Input
                                        className="col-span-3"
                                        value={newItem.code}
                                        onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Descripción</Label>
                                    <Input
                                        className="col-span-3"
                                        value={newItem.description}
                                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Categoría</Label>
                                    <Select
                                        value={newItem.category}
                                        onValueChange={(v) => setNewItem({ ...newItem, category: v })}
                                    >
                                        <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Insumos">Insumos (MP)</SelectItem>
                                            <SelectItem value="Producción">Producción (PT)</SelectItem>
                                            <SelectItem value="Empaque">Empaque</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Unidad Base</Label>
                                    <Input
                                        className="col-span-3"
                                        value={newItem.unit}
                                        onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                                        placeholder="ej. Kg"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Unidad Compra</Label>
                                    <Input
                                        className="col-span-3"
                                        value={newItem.purchasing_unit}
                                        onChange={(e) => setNewItem({ ...newItem, purchasing_unit: e.target.value })}
                                        placeholder="ej. Saco 50Kg"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Factor Conv.</Label>
                                    <Input
                                        type="number"
                                        className="col-span-3"
                                        value={newItem.conversion_factor}
                                        onChange={(e) => setNewItem({ ...newItem, conversion_factor: e.target.value })}
                                        placeholder="Cuantas Unidades Base hay en 1 Unidad Compra"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleCreate}>Guardar Maestro</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Items Totales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{items.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bajo Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-500">{items.filter(i => i.total_stock < 100).length} Items</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Almacenes Activos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{warehouses.length}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Maestro de Artículos y Stock Global</CardTitle>
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
                                <TableHead className="text-right">Stock Total</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">Sincronizando WMS...</TableCell>
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
                                        {item.total_stock} {item.unit}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/inventory/${item.id}`}>Detalle</Link>
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

