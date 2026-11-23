import { GITHUB_CONFIG } from '@/config'
import type { DrinksFile } from '@/types/drink'

const headers = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
})

function encodeBase64Utf8(value: string): string {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function decodeBase64Utf8(value: string): string {
  const binary = atob(value.replace(/\s/g, ''))
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export async function getCurrentUser(token: string): Promise<{ login: string }> {
  const response = await fetch('https://api.github.com/user', { headers: headers(token) })
  if (!response.ok) {
    throw new Error(`GitHub 认证失败（${response.status}），请检查 token`)
  }
  return response.json()
}

export async function fetchDrinks(
  token: string,
): Promise<{ file: DrinksFile; sha?: string }> {
  const { owner, repo, branch, path } = GITHUB_CONFIG
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    { headers: headers(token) },
  )

  if (response.status === 404) {
    return {
      file: { version: 1, updatedAt: new Date().toISOString(), drinks: [] },
      sha: undefined,
    }
  }
  if (!response.ok) {
    throw new Error(`读取记录失败（${response.status}）`)
  }

  const data = await response.json()
  const parsed = JSON.parse(decodeBase64Utf8(data.content)) as DrinksFile
  return { file: parsed, sha: data.sha as string }
}

export async function saveDrinks(
  token: string,
  file: DrinksFile,
  sha: string | undefined,
  message: string,
): Promise<string> {
  const { owner, repo, branch, path } = GITHUB_CONFIG
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: { ...headers(token), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        content: encodeBase64Utf8(JSON.stringify(file, null, 2)),
        branch,
        ...(sha ? { sha } : {}),
      }),
    },
  )

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`提交到 GitHub 失败（${response.status}）${detail ? `：${detail.slice(0, 120)}` : ''}`)
  }

  const data = await response.json()
  return data.content.sha as string
}
