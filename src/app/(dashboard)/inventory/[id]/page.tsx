"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, History, TrendingUp } from "lucide-react"
import { use } from "react"

export default function InventoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <a href="/inventory"><ArrowLeft className="h-4 w-4" /></a>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Detalle del Artículo</h1>
                    <p className="text-muted-foreground">ID: {id} | Harina de Trigo 000</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Información General</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Código Interno</label>
                                <p className="text-lg font-mono">HAR-000-01</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Categoría</label>
                                <p className="text-lg">Insumos</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Unidad de Medida</label>
                                <p className="text-lg">Kilogramos (Kg)</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Proveedor Principal</label>
                                <p className="text-lg">Molino Cañuelas</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Stock Actual</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-primary">1,500 Kg</div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Ubicación: <span className="font-mono">ALM-01-SEC</span>
                        </p>

                        <div className="mt-6 space-y-2">
                            <Button className="w-full" variant="outline">
                                <History className="mr-2 h-4 w-4" /> Ver Movimientos
                            </Button>
                            <Button className="w-full" variant="outline">
                                <TrendingUp className="mr-2 h-4 w-4" /> Ajustar Stock
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
