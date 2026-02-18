"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChefHat, Info, Scale } from "lucide-react"

const recipes = [
    {
        id: 1,
        parent: "Pan Baguette (x100u)",
        ingredients: [
            { name: "Harina 000", qty: 25, unit: "Kg" },
            { name: "Levadura", qty: 0.5, unit: "Kg" },
            { name: "Agua", qty: 15, unit: "L" },
            { name: "Sal", qty: 0.4, unit: "Kg" }
        ]
    },
    {
        id: 2,
        parent: "Medialunas (x12u)",
        ingredients: [
            { name: "Harina 000", qty: 0.5, unit: "Kg" },
            { name: "Manteca", qty: 0.2, unit: "Kg" },
            { name: "Azúcar", qty: 0.1, unit: "Kg" },
            { name: "Leche", qty: 0.2, unit: "L" }
        ]
    },
]

export default function ProductionPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Producción y Recetas</h1>
                    <p className="text-muted-foreground">Gestión de Escandallo y composiciones.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {recipes.map((recipe) => (
                    <Card key={recipe.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ChefHat className="h-5 w-5 text-orange-500" />
                                {recipe.parent}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ingrediente (Insumo)</TableHead>
                                        <TableHead className="text-right">%</TableHead>
                                        <TableHead className="text-right">Cantidad</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recipe.ingredients.map((ing, i) => {
                                        const flour = recipe.ingredients.find(i => i.name.includes("Harina"))?.qty || 1
                                        const pct = ((ing.qty / flour) * 100).toFixed(1)

                                        return (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">{ing.name}</TableCell>
                                                <TableCell className="text-right">
                                                    <span className="font-mono text-xs text-muted-foreground mr-2">{pct}%</span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Scale className="h-3 w-3 text-muted-foreground" />
                                                        {ing.qty} {ing.unit}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground bg-muted p-2 rounded">
                                <Info className="h-4 w-4" />
                                <span>Esta receta descuenta automáticamente del stock principal.</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
