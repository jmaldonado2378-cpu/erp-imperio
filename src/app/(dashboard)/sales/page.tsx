"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart, Send } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SalesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Punto de Venta (POS)</h1>
                    <p className="text-muted-foreground">Registrar ventas y descontar insumos automáticamente.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Nueva Venta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Input placeholder="Buscar producto (Código o Nombre)..." />
                            <Button size="icon"><Search className="h-4 w-4" /></Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {["Pan Frances", "Medialunas", "Facturas", "Pan Migo", "Sanguches", "Bebidas"].map((p) => (
                                <Button key={p} variant="outline" className="h-20 flex flex-col gap-1">
                                    <span className="font-bold">{p}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="h-full flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5" /> Ticket Actual
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                                <span>2x Pan Frances (Kg)</span>
                                <span className="font-bold">$2,400</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                                <span>12x Medialunas Manteca</span>
                                <span className="font-bold">$4,800</span>
                            </div>
                        </div>

                        <div className="space-y-4 mt-6">
                            <div className="flex justify-between text-lg font-bold border-t pt-4">
                                <span>Total a Pagar</span>
                                <span className="text-orange-500 text-2xl">$7,200</span>
                            </div>
                            <Button className="w-full h-12 text-lg">
                                <Send className="mr-2 h-5 w-5" /> Cobrar e Imprimir
                            </Button>
                            <p className="text-xs text-center text-muted-foreground">
                                * El escandallo se descontará del inventario al confirmar.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
