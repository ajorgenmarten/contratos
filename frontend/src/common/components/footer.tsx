import { appInfo, creatorInfo } from "../const/app-info"

export default function Footer() {
  return <footer className="mt-12 py-6 border-t text-center text-sm text-muted-foreground">
    <p>© 2026 {appInfo.name}. Todos los derechos reservados.</p>
    <p className="mt-1">
      Desarrollado por {creatorInfo.name} | Versión {appInfo.version}
    </p>
  </footer>
}
