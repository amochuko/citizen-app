import { useSignTypedData } from './use-wagmi'
import networkToId from './network-id'
import { nationPassportNFTIssuer } from './config'

const domain = {
  name: 'PassportIssuer',
  version: '1',
  chainId: networkToId(process.env.NEXT_PUBLIC_CHAIN),
  verifyingContract: nationPassportNFTIssuer
}

const types = {
  Agreement: [
    { name: "statement", type: "string" },
  ]
}

const value = {
  statement: 'I agree'
}

console.log(value.statement)

export function useSignAgreement({onSuccess}: {onSuccess: Function}) {
  return useSignTypedData({
    domain,
    types,
    value,
    onSuccess,
})
}

export async function storeSignature(signature: string, tx: string) {
  console.log(signature)
  const response = await fetch('/api/store-signature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({signature, tx})
  });
  return response.json()
}