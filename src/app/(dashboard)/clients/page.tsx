'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { Client, Station } from '@/lib/types'
import Modal from '@/components/ui/Modal'
import ClientForm from '@/components/forms/ClientForm'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import LoadingWrapper from '@/components/ui/LoadingWrapper'
import { fetchApi } from '@/lib/api'
import { mockClients } from '@/lib/mock-data'

export default function ClientsPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Use mock data in development
      if (process.env.NODE_ENV === 'development') {
        setClients(mockClients)
        return
      }

      const data = await fetchApi<Client[]>('/clients')
      setClients(data)
    } catch (error) {
      console.error('Error fetching clients:', error)
      if (error instanceof Error && error.message === 'Unauthorized') {
        router.push('/login')
      } else {
        setError('Failed to fetch clients. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchStations = async () => {
    try {
      const response = await fetch('/api/stations')
      if (!response.ok) throw new Error('Failed to fetch stations')
      const data = await response.json()
      setStations(data)
    } catch (error) {
      console.error('Error fetching stations:', error)
    }
  }

  const handleAddClient = async (newClient: Partial<Client>) => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) throw new Error('Failed to create client');
      
      const data = await response.json();
      setClients([...clients, data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error creating client:', error);
    }
  }

  const handleEditClient = async (updatedClient: Partial<Client>) => {
    try {
      const response = await fetch(`/api/clients/${editingClient?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClient),
      });

      if (!response.ok) throw new Error('Failed to update client');
      
      const data = await response.json();
      setClients(clients.map(client => 
        client.id === editingClient?.id ? data : client
      ));
      setEditingClient(null);
    } catch (error) {
      console.error('Error updating client:', error);
    }
  }

  const handleDeleteClient = async (clientId: number) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      const response = await fetch(`/api/clients/${clientId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete client');
      
      setClients(clients.filter(client => client.id !== clientId));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  }

  if (loading) {
    return <div>Loading clients...</div>
  }

  if (error) {
    return (
      <div className="text-red-600">
        {error}
        <button 
          onClick={fetchClients}
          className="ml-4 text-indigo-600 hover:text-indigo-800"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <LoadingWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-foreground">Clients</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              A list of all clients using RadioCopilot
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md 
                border border-transparent bg-primary px-4 py-2 text-sm 
                font-medium text-primary-foreground shadow-sm hover:bg-primary/90 
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Add Client
            </button>
          </div>
        </div>

        <div className="mt-8 bg-card shadow-sm ring-1 ring-border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Associated Stations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">{client.name}</div>
                    <div className="text-sm text-muted-foreground">{client.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {client.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {client.stationIds
                      ?.map(id => stations.find(s => s.id === id)?.name)
                      .filter(Boolean)
                      .join(', ') || 'No stations'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${client.status === 'active' 
                        ? 'bg-green-950 text-green-400' 
                        : 'bg-red-950 text-red-400'}`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setEditingClient(client)}
                      className="text-primary hover:text-primary/80 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Client"
        >
          <ClientForm
            stations={stations}
            onSubmit={handleAddClient}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={!!editingClient}
          onClose={() => setEditingClient(null)}
          title="Edit Client"
        >
          <ClientForm
            initialData={editingClient || undefined}
            stations={stations}
            onSubmit={handleEditClient}
            onCancel={() => setEditingClient(null)}
          />
        </Modal>
      </div>
    </LoadingWrapper>
  )
} 