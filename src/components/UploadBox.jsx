import { useCallback, useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

export default function UploadBox({ label, description, onUpload, preview }) {
  const [dragging, setDragging] = useState(false)

  const handleFiles = useCallback(
    (files) => {
      const file = files[0]
      if (file && file.type.startsWith('image/')) {
        onUpload({ file, preview: URL.createObjectURL(file), name: file.name })
      }
    },
    [onUpload]
  )

  return (
    <div>
      {label && <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>}
      {description && <p className="text-xs text-slate-500 mb-3">{description}</p>}

      {preview ? (
        <div className="relative rounded-xl overflow-hidden border border-neon/20 aspect-video bg-navy-800">
          <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onUpload(null)}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-navy-950/80 hover:bg-red-500/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
          className={`relative rounded-xl border-2 border-dashed transition-colors aspect-video flex flex-col items-center justify-center cursor-pointer ${
            dragging ? 'border-neon bg-neon/5' : 'border-white/10 hover:border-neon/30 bg-navy-800/50'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Upload className="w-8 h-8 text-slate-500 mb-2" />
          <p className="text-sm text-slate-400">Drop photo here or click to upload</p>
          <p className="text-xs text-slate-600 mt-1 flex items-center gap-1"><ImageIcon className="w-3 h-3" /> JPG, PNG up to 10MB</p>
        </div>
      )}
    </div>
  )
}
