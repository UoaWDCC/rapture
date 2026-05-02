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

        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        
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

    )

}