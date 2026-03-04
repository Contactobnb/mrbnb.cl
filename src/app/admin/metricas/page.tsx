'use client'

import { useState, useEffect } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

interface MetricsData {
  leadsPerMonth: Array<{ month: string; total: number; won: number; lost: number }>
  conversionByMonth: Array<{ month: string; rate: number }>
  leadsBySource: Array<{ name: string; value: number }>
  leadsByComuna: Array<{ comuna: string; count: number }>
  pipeline: Array<{ status: string; count: number; value: number }>
  summary: {
    totalLeads: number
    totalWon: number
    activeLeads: number
    conversionRate: number
    pipelineValue: number
  }
}

const COLORS = ['#1e3a5f', '#c53030', '#16a34a', '#f59e0b', '#7c3aed', '#06b6d4', '#ec4899', '#84cc16']

function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function MetricasPage() {
  const [data, setData] = useState<MetricsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch('/api/metricas')
        if (res.ok) {
          const json = await res.json()
          setData(json)
        }
      } catch (error) {
        console.error('Error fetching metrics:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMetrics()
  }, [])

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500">Cargando métricas...</div>
    )
  }

  if (!data) {
    return (
      <div className="p-12 text-center text-gray-500">Error al cargar métricas</div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Métricas</h1>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard title="Total Leads" value={data.summary.totalLeads.toString()} color="blue" />
        <SummaryCard title="Leads Activos" value={data.summary.activeLeads.toString()} color="green" />
        <SummaryCard
          title="Tasa de Conversión"
          value={`${data.summary.conversionRate}%`}
          subtitle={`${data.summary.totalWon} cerrados`}
          color="purple"
        />
        <SummaryCard
          title="Pipeline Total"
          value={formatCLP(data.summary.pipelineValue)}
          color="amber"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. Leads por mes (BarChart) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Leads por Mes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.leadsPerMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" name="Total" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
              <Bar dataKey="won" name="Ganados" fill="#16a34a" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lost" name="Perdidos" fill="#c53030" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Tasa de conversión (LineChart) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Tasa de Conversión Acumulada</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.conversionByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit="%" domain={[0, 'auto']} />
              <Tooltip formatter={(value) => [`${value}%`, 'Conversión']} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#7c3aed"
                strokeWidth={2}
                dot={{ r: 4, fill: '#7c3aed' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Leads por fuente (PieChart) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Leads por Fuente</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.leadsBySource}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                outerRadius={100}
                dataKey="value"
              >
                {data.leadsBySource.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 4. Leads por comuna (Horizontal BarChart) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Top Comunas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.leadsByComuna} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
              <YAxis type="category" dataKey="comuna" tick={{ fontSize: 12 }} width={100} />
              <Tooltip />
              <Bar dataKey="count" name="Leads" fill="#f59e0b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 5. Pipeline (AreaChart) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Pipeline por Estado</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.pipeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="status" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} allowDecimals={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'Valor') return [formatCLP(Number(value)), name]
                  return [value, name]
                }}
              />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="count" name="Leads" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={0.3} />
              <Area yAxisId="right" type="monotone" dataKey="value" name="Valor" stroke="#16a34a" fill="#16a34a" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({
  title,
  value,
  subtitle,
  color,
}: {
  title: string
  value: string
  subtitle?: string
  color: 'blue' | 'green' | 'purple' | 'amber'
}) {
  const bgColors = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
    amber: 'bg-amber-50 border-amber-200',
  }

  const textColors = {
    blue: 'text-blue-700',
    green: 'text-green-700',
    purple: 'text-purple-700',
    amber: 'text-amber-700',
  }

  return (
    <div className={`rounded-lg border p-4 ${bgColors[color]}`}>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${textColors[color]}`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}
