"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Truck, Phone, Mail, MapPin, Plus } from "lucide-react"
import { toast } from "sonner"

const initialSuppliers = [
    { id: 1, name: "Molino Cañuelas", contact: "Juan Pérez", phone: "+54 11 1234-5678", email: "ventas@molinocanuelas.com", category: "Harinas" },
    { id: 2, name: "Distribuidora El Trebol", contact: "María González", phone: "+54 11 8765-4321", email: "pedidos@eltrebol.com.ar", category: "Lácteos/Grasas" },
    { id: 3, name: "Papelera Del Sur", contact: "Roberto Díaz", phone: "+54 221 456-7890", email: "info@papeleradelsur.com", category: "Empaque" },
]

export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState(initialSuppliers)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newSupplier, setNewSupplier] = useState({ name: "", contact: "", phone: "", email: "" })

    const handleCreate = () => {
        if (!newSupplier.name) {
            toast.error("El nombre de la empresa es obligatorio")
            return
        }
        setSuppliers([...suppliers, { ...newSupplier, id: suppliers.length + 1, category: "General" }])
        setIsDialogOpen(false)
        setNewSupplier({ name: "", contact: "", phone: "", email: "" })
        toast.success("Proveedor registrado correctamente")
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Proveedores</h1>
                    <p className="text-muted-foreground">Gestión de compras y contactos externos.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Nuevo Proveedor
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Registrar Proveedor</DialogTitle>
                            <DialogDescription>
                                Ingrese los datos de contacto del nuevo proveedor.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Empresa</Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    value={newSupplier.name}
                                    onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact" className="text-right">Contacto</Label>
                                <Input
                                    id="contact"
                                    className="col-span-3"
                                    value={newSupplier.contact}
                                    onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">Teléfono</Label>
                                <Input
                                    id="phone"
                                    className="col-span-3"
                                    value={newSupplier.phone}
                                    onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="col-span-3"
                                    value={newSupplier.email}
                                    onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleCreate}>Guardar Proveedor</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Listado de Proveedores</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Proveedor</TableHead>
                                <TableHead>Contacto</TableHead>
                                <TableHead>Teléfono</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {suppliers.map((s) => (
                                <TableRow key={s.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Truck className="h-4 w-4 text-muted-foreground" />
                                            {s.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{s.contact}</TableCell>
                                    <TableCell>{s.phone}</TableCell>
                                    <TableCell>{s.email}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                                            {s.category}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Editar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
