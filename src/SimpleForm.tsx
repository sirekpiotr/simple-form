import React, { FormEvent } from 'react'
import { TicketData } from './submitTicketForm'

type FormProps = {
    onSubmit: (data: TicketData) => void
    isPending: boolean
}

type InputTypes = 'input' | 'textarea'

type InputProps = {
    type: InputTypes
    label: string
}

function FormField(props: InputProps): JSX.Element {
    const { type, label } = props

    function capitalizeFirstLetter(label: string) {
        return label.charAt(0).toUpperCase() + label.slice(1)
    }

    return (
        <React.Fragment>
            <label htmlFor={label}>{capitalizeFirstLetter(label)}:</label>
            {type === 'input' ? (
                <input id={label} type={label} data-cy={label} required />
            ) : (
                <textarea id={label} data-cy={label} required />
            )}
        </React.Fragment>
    )
}

function SimpleForm(props: FormProps): JSX.Element {
    const { onSubmit, isPending } = props

    const fields: InputProps[] = [
        { type: 'input', label: 'name' },
        { type: 'input', label: 'email' },
        { type: 'input', label: 'subject' },
        { type: 'textarea', label: 'message' },
    ]

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        const data = e.target as typeof e.target & TicketData

        onSubmit(data)
    }

    return (
        <div className="formWrapper">
            <h1>Ticket form</h1>
            <form onSubmit={handleSubmit}>
                {fields.map((field) => {
                    const { type, label } = field
                    return <FormField type={type} label={label} key={label} />
                })}
                <button type="submit" data-cy="submit" disabled={isPending}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export { SimpleForm }
