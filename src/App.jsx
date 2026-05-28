import { useEffect, useRef, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function App() {
  const pdfRef = useRef()

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [saveStatus, setSaveStatus] = useState('')
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    'Dados Gerais',
    'Identidade Visual',
    'Parâmetros',
    'Renderização',
    'Palestrantes',
    'Finalização',
  ]

  useEffect(() => {
    const saved = localStorage.getItem('programacao-cientifica')

    if (saved) {
      setFormData(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(
        'programacao-cientifica',
        JSON.stringify(formData)
      )

      setSaveStatus('Rascunho salvo automaticamente')

      setTimeout(() => {
        setSaveStatus('')
      }, 2000)
    }, 500)

    return () => clearTimeout(timeout)
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

  const requiredFields = [
    'nome_evento',
    'data_evento',
    'local_evento',
    'gestor_nome',
    'gestor_email',
  ]

  const validateStep = () => {
    const newErrors = {}

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true
      }
    })

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (!validateStep()) {
      alert('Preencha os campos obrigatórios.')
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
    const canvas = await html2canvas(pdfRef.current)

    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF('p', 'mm', 'a4')

    const width = pdf.internal.pageSize.getWidth()
    const height = (canvas.height * width) / canvas.width

    pdf.addImage(imgData, 'PNG', 0, 0, width, height)

    pdf.save('formulario-programacao-cientifica.pdf')
  }

  return (
    <div
      ref={pdfRef}
      className="min-h-screen bg-slate-100 p-6 text-slate-800"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <header className="bg-[#163b60] text-white p-8">
          <h1 className="text-4xl font-bold">
            Formulário de Ativação
          </h1>

          <p className="mt-3 text-cyan-200">
            Programação Científica • iCongresso
          </p>
        </header>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-10 flex-wrap">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  currentStep === index
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>

          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#163b60]">
                Dados Gerais
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold block mb-2">
                    Nome do Evento *
                  </label>

                  <input
                    type="text"
                    value={formData.nome_evento || ''}
                    onChange={(e) =>
                      handleChange('nome_evento', e.target.value)
                    }
                    className={`w-full border rounded-2xl px-4 py-3 ${
                      errors.nome_evento
                        ? 'border-red-500'
                        : 'border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-2">
                    Data do Evento *
                  </label>

                  <input
                    type="text"
                    value={formData.data_evento || ''}
                    onChange={(e) =>
                      handleChange('data_evento', e.target.value)
                    }
                    className={`w-full border rounded-2xl px-4 py-3 ${
                      errors.data_evento
                        ? 'border-red-500'
                        : 'border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-2">
                    Cidade *
                  </label>

                  <input
                    type="text"
                    value={formData.local_evento || ''}
                    onChange={(e) =>
                      handleChange('local_evento', e.target.value)
                    }
                    className={`w-full border rounded-2xl px-4 py-3 ${
                      errors.local_evento
                        ? 'border-red-500'
                        : 'border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-2">
                    Gestor Responsável *
                  </label>

                  <input
                    type="text"
                    value={formData.gestor_nome || ''}
                    onChange={(e) =>
                      handleChange('gestor_nome', e.target.value)
                    }
                    className={`w-full border rounded-2xl px-4 py-3 ${
                      errors.gestor_nome
                        ? 'border-red-500'
                        : 'border-slate-300'
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-semibold block mb-2">
                    E-mail do Gestor *
                  </label>

                  <input
                    type="email"
                    value={formData.gestor_email || ''}
                    onChange={(e) =>
                      handleChange('gestor_email', e.target.value)
                    }
                    className={`w-full border rounded-2xl px-4 py-3 ${
                      errors.gestor_email
                        ? 'border-red-500'
                        : 'border-slate-300'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-[#163b60] mb-6">
                Identidade Visual
              </h2>

              <div className="space-y-6">
                <input
                  type="file"
                  className="w-full border rounded-2xl p-4"
                />

                <input
                  type="file"
                  className="w-full border rounded-2xl p-4"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[#163b60] mb-6">
                Parâmetros
              </h2>

              <div className="space-y-4">
                <label className="flex gap-3">
                  <input type="checkbox" />
                  Conflito de interesses obrigatório
                </label>

                <label className="flex gap-3">
                  <input type="checkbox" />
                  Consentimento LGPD
                </label>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-[#163b60] mb-6">
                Renderização
              </h2>

              <select className="w-full border rounded-2xl px-4 py-3">
                <option>Português</option>
                <option>Inglês</option>
                <option>Espanhol</option>
              </select>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-[#163b60] mb-6">
                Cadastro de Palestrantes
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Foto',
                  'Mini currículo',
                  'WhatsApp',
                  'Instituição',
                ].map((item) => (
                  <label
                    key={item}
                    className="border rounded-2xl p-4 flex gap-3"
                  >
                    <input type="checkbox" />

                    {item}
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-[#163b60] mb-6">
                Finalização
              </h2>

              <textarea
                rows={6}
                placeholder="Observações finais..."
                className="w-full border rounded-2xl px-4 py-4"
              />
            </div>
          )}

          <div className="mt-10">
            {saveStatus && (
              <div className="text-sm text-emerald-600 font-medium mb-4">
                {saveStatus}
              </div>
            )}

            <div className="flex gap-4 flex-wrap">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 rounded-2xl border border-slate-300"
                >
                  Voltar
                </button>
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-3 rounded-2xl bg-cyan-500 text-white"
                >
                  Próxima Etapa
                </button>
              ) : (
                <button
                  onClick={generatePDF}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 text-white"
                >
                  Gerar PDF
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}