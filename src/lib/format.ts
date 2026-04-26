export function formatPKR(amount: number): string {
  return 'Rs ' + amount.toLocaleString('en-PK')
}

export function formatPercent(n: number): string {
  return n.toFixed(1) + '%'
}

export function formatDate(d: Date): string {
  return d.toLocaleString('en-PK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
