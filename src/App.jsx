import { useEffect, useRef, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function App() {
  const pdfRef = useRef(null)

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [saveStatus, setSaveStatus] = useState('')

  const steps = [
    'Responsáveis',
    'Dados do Evento',
    'Identidade Visual',
    'Estrutura',
    'Publicação',
    'Finalização',
  ]

  const sections = [
    {
      title: 'Responsáveis pelo Módulo',
      description:
        'Defina os principais contatos responsáveis pela operação e homologação.',
      contactsTable: true,
    },

    {
      title: 'Dados do Evento',
      description: 'Informações principais do evento.',
      fields: [
        {
          label: 'Nome do Evento',
          type: 'text',
          required: true,
        },
        {
          label: 'Cidade / Estado',
          type: 'text',
          required: true,
        },
        {
          label: 'Data de Realização',
          type: 'text',
          required: true,
        },
        {
          label: 'E-mail Principal',
          type: 'email',
          required: true,
        },
      ],
    },

    {
      title: 'Identidade Visual',
      description: 'Arquivos utilizados no sistema.',
      fields: [
        {
          label: 'Logo do Evento',
          type: 'file',
          required: true,
        },
        {
          label: 'Banner Desktop',
          type: 'file',
        },
      ],
    },

    {
      title: 'Estrutura Científica',
      description: 'Defina os recursos utilizados.',
      checkboxes: [
        'Sessões Simultâneas',
        'Programação Multilíngue',
        'Transmissão Online',
        'Certificados',
      ],
    },

    {
      title: 'Publicação',
      description: 'Configuração de publicação.',
      checkboxes: [
        'Publicar no Site',
        'Publicar no Aplicativo',
        'Exibir Currículo',
      ],
    },

    {
      title: 'Finalização',
      description: 'Checklist final.',
      final: true,
    },
  ]

  useEffect(() => {
    const saved = localStorage.getItem(
      'programacao-cientifica'
    )

    if (saved) {
      setFormData(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'programacao-cientifica',
      JSON.stringify(formData)
    )

    setSaveStatus('Rascunho salvo automaticamente')

    const timer = setTimeout(() => {
      setSaveStatus('')
    }, 2000)

    return () => clearTimeout(timer)
  }, [formData])

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [field]: false,
    }))
  }

  const validateCurrentStep = () => {
    const section = sections[currentStep]

    if (!section.fields) return true

    const newErrors = {}

    section.fields.forEach((field) => {
      if (
        field.required &&
        !formData[field.label]
      ) {
        newErrors[field.label] = true
      }
    })

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    const valid = validateCurrentStep()

    if (!valid) {
      alert(
        'Preencha os campos obrigatórios.'
      )
      return
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePDF = async () => {
    const canvas = await html2canvas(
      pdfRef.current
    )

    const imgData =
      canvas.toDataURL('image/png')

    const pdf = new jsPDF('p', 'mm', 'a4')

    const pdfWidth =
      pdf.internal.pageSize.getWidth()

    const pdfHeight =
      (canvas.height * pdfWidth) /
      canvas.width

    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      pdfWidth,
      pdfHeight
    )

    pdf.save(
      'Formulario-Programacao-Cientifica.pdf'
    )
  }

  return (
    <div
      ref={pdfRef}
      className="min-h-screen bg-slate-100 text-slate-800"
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10">
          <div className="flex items-center justify-between gap-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex-1 flex items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${index <= currentStep
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-300'
                    }`}
                >
                  {index + 1}
                </div>

                {index <
                  steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${index < currentStep
                          ? 'bg-cyan-500'
                          : 'bg-slate-300'
                        }`}
                    />
                  )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-3 text-sm">
            {steps.map((step, index) => (
              <span key={index}>
                {step}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-[#163b60] px-8 py-8 text-white">
            <h1 className="text-4xl font-bold">
              Formulário de Ativação
            </h1>

            <p className="mt-3 text-slate-200">
              Programação Científica
            </p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <div className="inline-flex bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
                Etapa {currentStep + 1}
              </div>

              <h2 className="text-3xl font-bold text-[#163b60] mt-4">
                {
                  sections[currentStep]
                    .title
                }
              </h2>

              <p className="text-slate-500 mt-2">
                {
                  sections[currentStep]
                    .description
                }
              </p>
            </div>

            {sections[currentStep]
              .fields && (
                <div className="grid md:grid-cols-2 gap-6">
                  {sections[
                    currentStep
                  ].fields.map(
                    (field, index) => (
                      <div
                        key={index}
                        className="space-y-2"
                      >
                        <label className="font-semibold text-sm">
                          {field.label}

                          {field.required && (
                            <span className="text-red-500 ml-1">
                              *
                            </span>
                          )}
                        </label>

                        {field.type ===
                          'file' ? (
                          <input
                            type="file"
                            onChange={(e) =>
                              handleChange(
                                field.label,
                                e.target
                                  .files[0]
                                  ?.name || ''
                              )
                            }
                            className="w-full border rounded-2xl px-4 py-3"
                          />
                        ) : (
                          <input
                            type={field.type}
                            value={
                              formData[
                              field.label
                              ] || ''
                            }
                            onChange={(e) =>
                              handleChange(
                                field.label,
                                e.target.value
                              )
                            }
                            className={`w-full border rounded-2xl px-4 py-3 ${errors[
                                field.label
                              ]
                                ? 'border-red-500'
                                : 'border-slate-300'
                              }`}
                          />
                        )}

                        {errors[
                          field.label
                        ] && (
                            <p className="text-red-500 text-sm">
                              Campo obrigatório
                            </p>
                          )}
                      </div>
                    )
                  )}
                </div>
              )}

            {sections[currentStep]
              .contactsTable && (
                <div className="space-y-4">
                  {[
                    'Nome',
                    'E-mail',
                    'Telefone',
                    'Cargo',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="grid md:grid-cols-3 gap-4"
                    >
                      <div className="font-semibold flex items-center">
                        {item}
                      </div>

                      <input
                        type="text"
                        placeholder="Contato 1"
                        className="border rounded-2xl px-4 py-3"
                      />

                      <input
                        type="text"
                        placeholder="Contato 2"
                        className="border rounded-2xl px-4 py-3"
                      />
                    </div>
                  ))}
                </div>
              )}

            {sections[currentStep]
              .checkboxes && (
                <div className="grid md:grid-cols-2 gap-4">
                  {sections[
                    currentStep
                  ].checkboxes.map(
                    (item, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 border rounded-2xl px-4 py-4"
                      >
                        <input
                          type="checkbox"
                          checked={
                            formData[item] ||
                            false
                          }
                          onChange={(e) =>
                            handleChange(
                              item,
                              e.target.checked
                            )
                          }
                        />

                        <span>{item}</span>
                      </label>
                    )
                  )}
                </div>
              )}

            {sections[currentStep]
              .final && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Checklist validado',
                      'Publicação aprovada',
                      'LGPD aprovado',
                      'Integração confirmada',
                    ].map((item, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 border rounded-2xl px-4 py-4"
                      >
                        <input type="checkbox" />

                        <span>{item}</span>
                      </label>
                    ))}
                  </div>

                  <textarea
                    rows="6"
                    placeholder="Observações adicionais"
                    className="w-full border rounded-2xl px-4 py-4"
                  />

                  <button
                    onClick={generatePDF}
                    className="px-8 py-4 rounded-2xl bg-cyan-600 text-white font-semibold"
                  >
                    Gerar PDF
                  </button>
                </div>
              )}

            <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
              <div>
                {saveStatus && (
                  <div className="text-sm text-emerald-600 font-medium">
                    {saveStatus}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 rounded-2xl border"
                  >
                    Voltar
                  </button>
                )}

                {currentStep <
                  steps.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 rounded-2xl bg-cyan-600 text-white"
                  >
                    Próxima Etapa
                  </button>
                ) : (
                  <button
                    onClick={generatePDF}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 text-white"
                  >
                    Finalizar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}