
export function SearchCandidate({value, onChange, loading}){
    
    return (
        <div className="mb-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Busqueda inteligente"
                    value={value}
                    onChange={(e) => {onChange(e.target.value)}}
                    className="
                    rounded-md
                    border border-gray 300
                    bg-white
                    px-4 py-2
                    text-sm
                    focus:border-blue-500
                    focus:outline-none
                    focus: ring-1 focus:ring-blue-500"
                    
                />
                {loading && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        Buscando...
                    </span>
                )}
            </div>
        </div>
    )
}