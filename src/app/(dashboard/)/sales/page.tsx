import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Plus, Minus, Trash2, Send } from "lucide-react"

const products = [
    { id: 1, name: "Pan Baguette", price: 120, stock_ingredients: "Suficiente" },
    { id: 2, name: "Medialunas (Docena)", price: 2400, stock_ingredients: "Crítico" },
    { id: 3, name: "Pan de Miga", price: 800, stock_ingredients: "Suficiente" },
]

export default function SalesPage() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Ventas (POS)</h1>
                    <p className="text-muted-foreground">Registrar ventas y descontar materia prima automáticamente.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {products.map((product) => (
                        <Card key={product.id} className="cursor-pointer hover:border-primary transition-colors">
                            <CardContent className="p-4 flex flex-col justify-between h-full">
                                <div className="flex justify-between items-start">
                                    <div className="font-semibold">{product.name}</div>
                                    <div className="text-primary font-bold">${product.price}</div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${product.stock_ingredients === 'Suficiente' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                        Ingredientes: {product.stock_ingredients}
                                    </span>
                                    <Button size="sm" className="h-8">
                                        <Plus className="h-4 w-4 mr-1" /> Añadir
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-1">
                <Card className="h-fit sticky top-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5" /> Carrito
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2 min-h-[200px]">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">2x</span>
                                    <span>Pan Baguette</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>$240</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>$240.00</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary">$240.00</span>
                            </div>
                        </div>

                        <Button className="w-full h-12 text-lg font-bold">
                            <Send className="mr-2 h-5 w-5" /> Procesar Venta
                        </Button>
                        <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                            El escandallo se aplicará al confirmar
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
