import { bold, cyan } from 'chalk'
import { execCommand, execCommandAttached } from '../util/exec'

type CloudSqlProxyPod = {
  name: string
  context: string
  namespace: string
  serviceAccount: string
  instance: string
  localPort: number
  remotePort: number
}

export const runCloudSqlProxyPod = (pod: CloudSqlProxyPod): string => {
  return execCommand(`
    kubectl run \
      --image=gcr.io/cloudsql-docker/gce-proxy \
      --context="${pod.context}" \
      --namespace="${pod.namespace}" \
      --overrides='{"spec": {"serviceAccount": "${pod.serviceAccount}"}}' \
      --annotations="cluster-autoscaler.kubernetes.io/safe-to-evict=true" \
      --labels=app=google-cloud-sql \
      ${pod.name} \
      -- /cloud_sql_proxy -enable_iam_login -ip_address_types=PRIVATE -instances=${pod.instance}=tcp:${pod.remotePort}
  `)
}

export const deletePod = (pod: CloudSqlProxyPod) => {
  console.log(`Deleting pod '${bold(cyan(pod.name))}'.`)
  execCommand(`
    kubectl delete pod ${pod.name} \
      --context="${pod.context}" \
      --namespace="${pod.namespace}"
  `)
  console.log(`Pod '${bold(cyan(pod.name))}' deleted.`)
}

export const waitForPodReady = (pod: CloudSqlProxyPod) => {
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

export const portForward = (pod: CloudSqlProxyPod) => {
  console.log(`Starting port forwarding to pod '${bold(cyan(pod.name))}'.`)
  execCommandAttached(`
    kubectl port-forward ${pod.name} ${pod.localPort}:${pod.remotePort} \
      --context="${pod.context}" \
      --namespace="${pod.namespace}"
  `)
}
