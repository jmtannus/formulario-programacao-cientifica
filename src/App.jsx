export default function FormularioProgramacaoCientifica() {
  const sections = [
    {
      title: 'Responsáveis pelo Módulo',
      description: 'Defina os principais contatos responsáveis pela operação e homologação da Programação Científica.',
      contactsTable: true,
    },
    {
      title: 'Dados do Evento',
      description: 'Informações gerais utilizadas na configuração inicial do módulo.',
      fields: [
        { label: 'Nome do Evento', type: 'text', required: true },
        { label: 'Data de Realização', type: 'text', required: true },
        { label: 'Cidade / Estado', type: 'text', required: true },
        { label: 'Local do Evento', type: 'text', required: true },
        { label: 'E-mail Principal', type: 'email', required: true },
        { label: 'Idioma Principal', type: 'select', options: ['Português', 'Inglês', 'Espanhol'], required: true },
      ],
    },
    {
      title: 'Identidade Visual',
      description: 'Arquivos utilizados no site, aplicativo e área restrita.',
      fields: [
        { label: 'Logomarca do Evento (.PNG)', type: 'file', required: true },
        { label: 'Logomarca da Organizadora (.PNG)', type: 'file', required: true },
        { label: 'Banner Desktop (1550px x 160px)', type: 'file' },
        { label: 'Banner Mobile (700px x 160px)', type: 'file' },
      ],
    },
    {
      title: 'Estrutura Científica',
      description: 'Defina a estrutura organizacional da programação científica.',
      checkboxes: [
        'Eixos Temáticos',
        'Trilhas',
        'Salas Simultâneas',
        'Sessões Híbridas',
        'Sessões Gravadas',
        'On Demand',
        'Programação Multilíngue',
      ],
    },
    {
      title: 'Tipos de Atividade',
      description: 'Selecione os formatos científicos que serão utilizados.',
      checkboxes: [
        'Conferência',
        'Mesa-redonda',
        'Simpósio',
        'Workshop',
        'Curso',
        'Painel',
        'Caso Clínico',
        'Solenidade',
      ],
    },
    {
      title: 'Cadastro de Palestrante',
      description: 'Defina quais campos serão obrigatórios no cadastro do palestrante.',
      checkboxes: [
        'Nome Completo',
        'CPF / Passaporte',
        'E-mail',
        'Telefone',
        'Instituição',
        'Foto',
        'Mini Currículo',
        'Conflito de Interesse',
        'Endereço Completo',
        'Nacionalidade',
        'LinkedIn',
        'ORCID',
        'Autorização de Uso de Imagem',
      ],
    },
    {
      title: 'Fluxo de Convites',
      description: 'Configure o comportamento do envio de convites e aceite.',
      checkboxes: [
        'Aceite Automático',
        'Recusa Automática',
        'Lembretes Automáticos',
        'Reenvio de Convites',
        'Aceite LGPD',
        'Direito de Imagem',
      ],
    },
    {
      title: 'Publicação e Integrações',
      description: 'Defina onde e como a programação será exibida.',
      checkboxes: [
        'Publicar no Site',
        'Publicar no Aplicativo',
        'Exibir Foto do Palestrante',
        'Exibir Currículo',
        'Atualização Automática',
        'Integração com Certificados',
      ],
    },
    {
      title: 'Relatórios',
      description: 'Selecione os relatórios operacionais necessários.',
      checkboxes: [
        'Choque de Sala',
        'Choque de Palestrante',
        'Sem Palestrante',
        'Programação Analítica',
        'Programação Quantitativa',
        'Exportação Excel',
        'Exportação PDF',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <header className="bg-gradient-to-r from-[#163b60] to-[#1c4e80] shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <p className="uppercase tracking-[0.25em] text-cyan-300 text-xs font-semibold mb-3">
                iCongresso • iTarget Tecnologia
              </p>

              <h1 className="text-4xl font-bold text-white leading-tight">
                Formulário de Ativação
                <span className="block text-cyan-300 mt-2">
                  Programação Científica
                </span>
              </h1>

              <p className="text-slate-200 mt-4 max-w-3xl text-sm leading-7">
                Configure toda a estrutura operacional, científica e de publicação do módulo de Programação Científica do iCongresso.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-sm text-white w-[320px]">
              <div className="text-sm text-slate-200 mb-2">
                Status da Configuração
              </div>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-cyan-400 rounded-full"></div>
              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-300">
                <span>Pré-configuração</span>
                <span>65%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[320px_1fr] gap-8">
        <aside className="hidden lg:block sticky top-6 h-fit">
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <h2 className="font-bold text-lg text-[#163b60] mb-5">
              Navegação
            </h2>

            <div className="space-y-3">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#section-${index}`}
                  className="block p-3 rounded-xl border border-slate-100 hover:border-cyan-300 hover:bg-cyan-50 transition-all text-sm font-medium text-slate-700"
                >
                  {index + 1}. {section.title}
                </a>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <section
              key={index}
              id={`section-${index}`}
              className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden"
            >
              <div className="border-b border-slate-100 px-8 py-7 bg-slate-50">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      Etapa {index + 1}
                    </div>

                    <h2 className="text-2xl font-bold text-[#163b60]">
                      {section.title}
                    </h2>

                    <p className="text-slate-500 mt-2 text-sm max-w-3xl leading-6">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {section.fields && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {section.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 block">
                          {field.label}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>

                        {field.type === 'select' ? (
                          <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition-all">
                            {field.options.map((option, optionIndex) => (
                              <option key={optionIndex}>{option}</option>
                            ))}
                          </select>
                        ) : field.type === 'file' ? (
                          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50 hover:bg-cyan-50 hover:border-cyan-300 transition-all cursor-pointer">
                            <input type="file" className="w-full text-sm" />
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition-all"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.contactsTable && (
                  <div className="overflow-x-auto">
                    <div className="min-w-[760px] border border-slate-200 rounded-3xl overflow-hidden">
                      <div className="grid grid-cols-[220px_1fr_1fr] bg-slate-100 border-b border-slate-200">
                        <div className="px-6 py-5 font-bold text-[#163b60] border-r border-slate-200">
                          Campo
                        </div>

                        <div className="px-6 py-5 font-bold text-[#163b60] border-r border-slate-200">
                          Contato 1
                        </div>

                        <div className="px-6 py-5 font-bold text-[#163b60]">
                          Contato 2
                        </div>
                      </div>

                      {[
                        'Nome Completo',
                        'E-mail',
                        'Telefone / WhatsApp',
                        'Cargo',
                        'Empresa / Instituição',
                      ].map((field, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="grid grid-cols-[220px_1fr_1fr] border-b border-slate-200 last:border-b-0"
                        >
                          <div className="px-6 py-6 bg-slate-50 border-r border-slate-200 font-medium text-slate-700 flex items-center">
                            {field}
                          </div>

                          <div className="p-4 border-r border-slate-200 bg-white">
                            <input
                              type="text"
                              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition-all"
                            />
                          </div>

                          <div className="p-4 bg-white">
                            <input
                              type="text"
                              className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition-all"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.checkboxes && (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {section.checkboxes.map((item, itemIndex) => (
                      <label
                        key={itemIndex}
                        className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-4 hover:border-cyan-300 hover:bg-cyan-50 transition-all cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-400"
                        />

                        <span className="text-sm font-medium text-slate-700">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

          <section className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="border-b border-slate-100 px-8 py-7 bg-slate-50">
              <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                Finalização
              </div>

              <h2 className="text-2xl font-bold text-[#163b60]">
                Observações Gerais
              </h2>
            </div>

            <div className="p-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 block">
                  Informações adicionais
                </label>

                <textarea
                  rows={7}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-4 focus:outline-none focus:ring-4 focus:ring-cyan-100 focus:border-cyan-400 transition-all resize-none"
                  placeholder="Digite aqui observações importantes, regras operacionais, necessidades específicas ou informações adicionais para implantação."
                ></textarea>
              </div>

              <div className="mt-10 flex items-center justify-between flex-wrap gap-5">
                <div className="text-sm text-slate-500 leading-6 max-w-xl">
                  Ao finalizar, a equipe da iTarget poderá utilizar essas informações para configuração, homologação e publicação do módulo de Programação Científica.
                </div>

                <div className="flex gap-4">
                  <button className="px-6 py-4 rounded-2xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-all">
                    Salvar Rascunho
                  </button>

                  <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all">
                    Finalizar Configuração
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
