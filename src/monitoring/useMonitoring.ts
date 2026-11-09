import { useSyncExternalStore } from 'react'
import { getMonitoringState, subscribeMonitoring } from './store'

export function useMonitoring() {
  return useSyncExternalStore(subscribeMonitoring, getMonitoringState)
}
