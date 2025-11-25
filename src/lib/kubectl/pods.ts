import { bold, cyan } from 'chalk'
import { execCommand, execCommandAttached } from '../util/exec'
import { DatabaseType } from '../types'

type ProxyPod = {
  name: string
  context: string
  namespace: string
  serviceAccount: string
  instance: string
  localPort: number
  remotePort: number
  databaseType?: DatabaseType
}

export const runCloudSqlProxyPod = (pod: ProxyPod): string => {
  return execCommand(`
    kubectl run \
      --image=gcr.io/cloud-sql-connectors/cloud-sql-proxy \
      --context="${pod.context}" \
      --namespace="${pod.namespace}" \
      --overrides='{"spec": {"serviceAccount": "${pod.serviceAccount}"}}' \
      --annotations="cluster-autoscaler.kubernetes.io/safe-to-evict=true" \
      --labels=app=google-cloud-sql \
      ${pod.name} \
      -- --auto-iam-authn --auto-ip '${pod.instance}?port=${pod.remotePort}'
  `)
}

export const runAlloyDbProxyPod = (pod: ProxyPod): string => {
  return execCommand(`
    kubectl run \
      --image=gcr.io/alloydb-connectors/alloydb-auth-proxy \
      --context="${pod.context}" \
      --namespace="${pod.namespace}" \
      --overrides='{"spec": {"serviceAccount": "${pod.serviceAccount}"}}' \
      --annotations="cluster-autoscaler.kubernetes.io/safe-to-evict=true" \
      --labels=app=google-cloud-alloydb \
      ${pod.name} \
      -- --address=0.0.0.0 --port=${pod.remotePort} --auto-iam-authn --structured-logs '${pod.instance}'
  `)
}

export const deletePod = (pod: ProxyPod) => {
  console.log(`Deleting pod '${bold(cyan(pod.name))}'.`)
  execCommand(`
    kubectl delete pod ${pod.name} \
      --context="${pod.context}" \
      --namespace="${pod.namespace}"
  `)
  console.log(`Pod '${bold(cyan(pod.name))}' deleted.`)
}

export const waitForPodReady = (pod: ProxyPod) => {
  console.log(`Waiting for pod '${bold(cyan(pod.name))}'.`)
  execCommand(`
    kubectl wait pod ${pod.name} \
      --for=condition=ready \
      --timeout=300s \
      --context="${pod.context}" \
      --namespace="${pod.namespace}"
  `)
  console.log(`Pod '${bold(cyan(pod.name))}' is ready.`)
}

export const portForward = (pod: ProxyPod) => {
  console.log(`Starting port forwarding to pod '${bold(cyan(pod.name))}'.`)
  execCommandAttached(`
    kubectl port-forward ${pod.name} ${pod.localPort}:${pod.remotePort} \
      --context="${pod.context}" \
      --namespace="${pod.namespace}"
  `)
}
