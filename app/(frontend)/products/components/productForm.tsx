'use client'
import { useState } from "react"

export default function ProductForm() {

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [currency, setCurrency] = useState("NZD")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState<File | null>(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setError("")
        setSuccess(false)
        setLoading(true)

    try {
        let imageId = null;

        if (image) {
            const formData = new FormData()
            formData.append("file", image)

            const uploadRes = await fetch("/api/media", {
                method: "POST",
                body: formData,
            })

            if (!uploadRes.ok) {
                throw new Error("Failed to upload image")
            }

            const uploadData = await uploadRes.json()
            imageId = uploadData.doc.id
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                price,
                currency,
                description,
                image: imageId,
                _status: "published",
            }),
        })

        if (!res.ok) {
            throw new Error("Failed to create product")
        }

        setSuccess(true)

    } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
        setLoading(false)
    }
}

    return (
        <div>
            {error && <p style={{color: "red"}}>{error}</p>}
            {success && <p style={{color: "green"}}>Product created successfully!</p>}
        
        <form onSubmit = {handleSubmit}>
            <label>Product Name</label>
            <input
            type = "text"
            value = {name}
            onChange = {(e) => setName(e.target.value)}
            required
            />

            <label>Price</label>
            <input
            type = "number"
            value = {price}
            onChange = {(e) => setPrice(Number(e.target.value))}
            required
            />

            <label>Currency</label>
            <select
            value = {currency}
            onChange = {(e) => setCurrency(e.target.value)}
            required
        >
            <option value="NZD">NZD</option>
            <option value="AUD">AUD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>

            </select>


            <label>Description</label>
            <input
            type = "text"
            value = {description}
            onChange = {(e) => setDescription(e.target.value)}
            />

            <label>Image</label>
            <input
            type = "file"
            accept = "image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            />

            <button type = "submit" disabled = {loading}>
                {loading ? "Submitting..." : "Add Product"}
            </button>

        </form>

        </div>

    )

}
