"use client"

import { useState } from "react"
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
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react"
import { motion } from "framer-motion"

const inventoryItems = [
    { id: 1, code: "HAR-000-01", description: "Harina de Trigo 000", category: "Insumos", stock: 1500, unit: "Kg" },
    { id: 2, code: "LEV-FRE-01", description: "Levadura Fresca Prensada", category: "Insumos", stock: 25, unit: "Kg" },
    { id: 3, code: "GRA-MAR-01", description: "Margarina para Hojaldre", category: "Insumos", stock: 80, unit: "Kg" },
    { id: 4, code: "AZU-BLA-01", description: "Azúcar Blanco Común", category: "Insumos", stock: 200, unit: "Kg" },
    { id: 5, code: "SAL-FIN-01", description: "Sal Fina Yodada", category: "Insumos", stock: 50, unit: "Kg" },
]

export default function InventoryPage() {
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
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Artículo
                </Button>
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
                        <div className="text-2xl font-bold text-orange-500">3 Items</div>
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
                            {inventoryItems.map((item) => (
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
                                        <Button variant="ghost" size="sm">Ver</Button>
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
