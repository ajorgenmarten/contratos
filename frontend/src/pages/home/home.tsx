import Layout from "@/common/components/layout";

export default function Home() {
  return <Layout >
    <div className="container mx-auto px-4 py-8">
      <section className="flex h-[calc(100vh-220px)] flex-col items-center justify-center text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
          Gestión Inteligente de Contratos
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Centraliza, protege y administra todos tus contratos en un solo lugar
        </p>
      </section>
    </div>
  </Layout >
}
