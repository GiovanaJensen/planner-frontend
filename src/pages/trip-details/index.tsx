import { Calendar, MapPin, Settings2 } from "lucide-react";

export function TripDetailsPage() {
    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <div className="px-4 py-5 bg-zinc-900 rounded-xl h-16 shadow-shape flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <MapPin className="size-5 text-zinc-400"/>
                    <span className="text-zinc-100">Florianópolis, Brasil</span>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1">
                        <Calendar className="size-5 text-zinc-400"/>
                        <span className="text-zinc-100">17 a 23 de Agosto</span>
                    </div>
                    <div>
                    <button className='bg-zinc-800 text-zinc-200 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-zinc-700'>
                        Alterar
                        <Settings2 className='size-5'/>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}