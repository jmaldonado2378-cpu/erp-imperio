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
    { id: 1, code: "HAR-000-01", description: "Harina de Trigo 000", category: "Materia Prima", stock: 1500, unit: "Kg" },
    { id: 2, code: "LEV-FRE-01", description: "Levadura Fresca Prensada", category: "Materia Prima", stock: 25, unit: "Kg" },
    { id: 3, code: "GRA-MAR-01", description: "Margarina para Hojaldre", category: "Materia Prima", stock: 80, unit: "Kg" },
    { id: 4, code: "PAN-FRA-01", description: "Pan Francés (Kilo)", category: "Producto Terminado", stock: 450, unit: "Un" },
    { id: 5, code: "MIG-SAN-01", description: "Pan de Miga 500g", category: "Producto Terminado", stock: 32, unit: "Un" },
]

export default function InventoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
                    <p className="text-muted-foreground">Gestión de materias primas y productos terminados.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Item
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Buscar por código o descripción..."
                        className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">Código <ArrowUpDown className="inline h-3 w-3" /></TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead className="text-right">Stock Actual</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
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
                                    <TableCell className="text-right font-medium">
                                        {item.stock} {item.unit}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">Ver</Button>
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
