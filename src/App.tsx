import React from 'react'
import './App.css'
import { SimpleForm } from './SimpleForm'
import { submitTicketForm, TicketData } from './submitTicketForm'

function App(): JSX.Element {
    const [ticketRequestStatus, setTicketStatus] = React.useState<
        'success' | 'fail' | 'pending' | undefined
    >()

    function handleSubmit(ticketData: TicketData) {
        setTicketStatus('pending')
        submitTicketForm(ticketData).then((value) => {
            setTicketStatus(value)
        })
    }

    if (ticketRequestStatus === 'success') {
        return (
            <div className="App">
                <h1 className="success" data-cy="success">
                    Thank you!
                </h1>
            </div>
        )
    }

    if (ticketRequestStatus === 'fail') {
        return (
            <div className="App">
                <h1 className="fail" data-cy="fail">
                    Error!
                </h1>
            </div>
        )
    }

    return (
        <div className="App">
            <SimpleForm
                onSubmit={handleSubmit}
                isPending={ticketRequestStatus === 'pending'}
            />
        </div>
    )
}

export default App
