import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChefHat, Plus, FlaskConical, Scale, Info } from "lucide-react"

const recipes = [
    { id: 1, parent: "Pan Baguette", ingredients: [{ name: "Harina 000", qty: 0.5, unit: "Kg" }, { name: "Levadura", qty: 10, unit: "g" }] },
    { id: 2, parent: "Pan de Miga", ingredients: [{ name: "Harina 000", qty: 0.7, unit: "Kg" }, { name: "Grasa", qty: 50, unit: "g" }] },
]

export default function ProductionPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Producción y Recetas</h1>
                    <p className="text-muted-foreground">Define el Escandallo para cada producto terminado.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Nueva Receta
                </Button>
            </div>

            <div className="grid gap-6">
                {recipes.map((recipe) => (
                    <Card key={recipe.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <CardTitle className="flex items-center gap-2">
                                <ChefHat className="h-5 w-5 text-primary" /> {recipe.parent}
                            </CardTitle>
                            <Button variant="outline" size="sm">Editar BOM</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ingrediente</TableHead>
                                        <TableHead>Cantidad Requerida</TableHead>
                                        <TableHead>Unidad</TableHead>
                                        <TableHead>Impacto de Merma</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recipe.ingredients.map((ing, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium">{ing.name}</TableCell>
                                            <TableCell>{ing.qty}</TableCell>
                                            <TableCell>{ing.unit}</TableCell>
                                            <TableCell className="text-muted-foreground">--</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4 flex items-start gap-4">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                        <p className="text-sm font-semibold">Nota para el Panadero</p>
                        <p className="text-xs text-muted-foreground">
                            Las cantidades aquí definidas son las que el sistema descontará automáticamente del almacén seco (ALM-01-SEC) o cámara de frío (ALM-01-FRI) al momento de la venta.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
