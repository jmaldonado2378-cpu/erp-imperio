"use client"

import { useState } from "react"
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
import { toast } from "sonner"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChefHat, Info, Scale } from "lucide-react"

const initialRecipes = [
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
    const [recipes, setRecipes] = useState(initialRecipes)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newRecipe, setNewRecipe] = useState({ name: "", base: "" })

    const handleCreate = () => {
        if (!newRecipe.name) {
            toast.error("El nombre de la receta es obligatorio")
            return
        }
        setRecipes([...recipes, {
            id: recipes.length + 1,
            parent: newRecipe.name,
            ingredients: [
                { name: "Harina Base", qty: Number(newRecipe.base) || 1, unit: "Kg" }
            ]
        }])
        setIsDialogOpen(false)
        setNewRecipe({ name: "", base: "" })
        toast.success("Receta creada exitosamente")
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Producción y Recetas</h1>
                    <p className="text-muted-foreground">Gestión de Escandallo y composiciones.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <ChefHat className="mr-2 h-4 w-4" /> Nueva Receta
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Crear Nueva Receta</DialogTitle>
                            <DialogDescription>
                                Defina el producto final y sus ingredientes base.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Nombre</Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    value={newRecipe.name}
                                    onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="base" className="text-right">Base (Harina)</Label>
                                <Input
                                    id="base"
                                    type="number"
                                    className="col-span-3"
                                    value={newRecipe.base}
                                    onChange={(e) => setNewRecipe({ ...newRecipe, base: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleCreate}>Guardar Receta</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
