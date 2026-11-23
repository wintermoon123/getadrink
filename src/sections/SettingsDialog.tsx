import { useState, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hasToken: boolean
  syncing: boolean
  onConnect: (token: string) => void
  onDisconnect: () => void
  onExport: () => void
  onImport: (file: File) => void
}

export function SettingsDialog({
  open,
  onOpenChange,
  hasToken,
  syncing,
  onConnect,
  onDisconnect,
  onExport,
  onImport,
}: SettingsDialogProps) {
  const [value, setValue] = useState('')

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) onImport(file)
    event.target.value = ''
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-hand text-3xl">同步设置</DialogTitle>
          <DialogDescription>
            每次新增、修改或删除都会把 <code>data/drinks.json</code> 提交到仓库，提交历史可追溯。
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="github-token">Fine-grained token</Label>
            <Input
              id="github-token"
              type="password"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="github_pat_..."
              autoComplete="off"
            />
            <p className="text-xs leading-relaxed text-muted-foreground">
              仅授权 <code>getadrink</code> 仓库，权限勾选 Contents: read/write，并设置过期时间。
              token 只保存在本机浏览器，不会写入公开源码。
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                onConnect(value.trim())
                setValue('')
              }}
              disabled={!value.trim() || syncing}
              className="cursor-pointer"
            >
              {syncing ? '连接中…' : '连接并同步'}
            </Button>
            {hasToken && (
              <Button variant="outline" onClick={onDisconnect} className="cursor-pointer">
                断开同步
              </Button>
            )}
          </div>

          <div className="border-t border-dashed border-border pt-4">
            <p className="mb-2 text-sm font-medium">本地备份</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={onExport} className="cursor-pointer">
                导出 JSON
              </Button>
              <label className="inline-flex h-8 cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium transition-colors hover:bg-secondary">
                导入 JSON
                <input type="file" accept="application/json" className="hidden" onChange={handleFile} />
              </label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
