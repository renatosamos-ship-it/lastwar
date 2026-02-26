import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Loader2, AlertCircle, CheckCircle, TrendingUp, Target } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface SquadAnalysis {
  detectedHeroes: Array<{
    name: string;
    confidence: number;
    role: string;
  }>;
  squadType: string;
  powerScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }> | string[];
  matchups: {
    advantageAgainst: string[];
    disadvantageAgainst: string[];
  };
  nextSteps: {
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  analysis?: string;
}

export default function SquadAnalyzer() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SquadAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const analyzeSquadMutation = trpc.squad.analyzeSquad.useMutation();

  const analyzeSquad = async (file: File) => {
    setAnalyzing(true);
    setError(null);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64String = (event.target?.result as string).split(',')[1];
          
          const analysisResult = await analyzeSquadMutation.mutateAsync({
            imageBase64: base64String,
            fileName: file.name,
          });

          if (analysisResult && analysisResult.analysis) {
            const analysisData: SquadAnalysis = {
              detectedHeroes: analysisResult.detectedHeroes || analysisResult.analysis.squad?.heroes || [],
              squadType: analysisResult.analysis.analysis.squadType || 'Esquadrão Analisado',
              powerScore: analysisResult.analysis.analysis.powerLevel || 0,
              strengths: analysisResult.analysis.analysis.strengths || [],
              weaknesses: analysisResult.analysis.analysis.weaknesses || [],
              recommendations: (Array.isArray(analysisResult.analysis.analysis.recommendations) && analysisResult.analysis.analysis.recommendations.length > 0 && typeof analysisResult.analysis.analysis.recommendations[0] === 'object') ? analysisResult.analysis.analysis.recommendations : [],
              matchups: (analysisResult.analysis as any).matchups || {
                advantageAgainst: [],
                disadvantageAgainst: [],
              },
              nextSteps: analysisResult.analysis.analysis.nextSteps || {
                shortTerm: [],
                mediumTerm: [],
                longTerm: [],
              },
              analysis: (analysisResult.analysis as any).analysis,
            };
            setAnalysis(analysisData);
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Erro ao analisar esquadrão';
          setError(errorMessage);
          setAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar arquivo';
      setError(errorMessage);
      setAnalyzing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      analyzeSquad(file);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-600 text-white';
      case 'medium':
        return 'bg-orange-600 text-white';
      case 'low':
        return 'bg-yellow-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {!analysis ? (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-orange-400">📸 Analisador de Esquadrão</CardTitle>
            <CardDescription>Faça upload de uma imagem do seu esquadrão para análise detalhada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-orange-400 transition"
            >
              <Upload className="mx-auto mb-4 text-orange-400" size={48} />
              <p className="text-foreground font-semibold mb-2">Clique para fazer upload ou arraste uma imagem</p>
              <p className="text-muted-foreground text-sm">Suporta PNG, JPG, WebP (máx. 10MB)</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                <img src={imagePreview} alt="Preview" className="w-full max-h-96 object-cover rounded border border-border" />
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-600/10 border border-red-600 rounded flex gap-3">
                <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-red-400">Erro na Análise</p>
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              </div>
            )}

            {analyzing && (
              <div className="p-4 bg-blue-600/10 border border-blue-600 rounded flex gap-3 items-center">
                <Loader2 className="text-blue-400 animate-spin" size={20} />
                <p className="text-blue-300">Analisando seu esquadrão com IA...</p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="heroes">Heróis</TabsTrigger>
            <TabsTrigger value="matchups">Matchups</TabsTrigger>
            <TabsTrigger value="improvements">Melhorias</TabsTrigger>
          </TabsList>

          {/* VISÃO GERAL */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-orange-400">📊 Análise Geral</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded border border-border text-center">
                    <p className="text-xs text-muted-foreground">Tipo de Esquadrão</p>
                    <p className="text-lg font-bold text-cyan-400 mt-2">{analysis.squadType}</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border text-center">
                    <p className="text-xs text-muted-foreground">Poder Total</p>
                    <p className="text-2xl font-bold text-orange-400 mt-2">{analysis.powerScore}</p>
                  </div>
                  <div className="p-4 bg-background rounded border border-border text-center">
                    <p className="text-xs text-muted-foreground">Heróis Detectados</p>
                    <p className="text-2xl font-bold text-purple-400 mt-2">{analysis.detectedHeroes.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pontos Fortes */}
            {analysis.strengths.length > 0 && (
              <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#00d9ff' }}>
                <CardHeader>
                  <CardTitle className="text-cyan-400">✅ Pontos Fortes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-foreground flex gap-2">
                        <span className="text-green-400">✓</span> {strength}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Pontos Fracos */}
            {analysis.weaknesses.length > 0 && (
              <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
                <CardHeader>
                  <CardTitle className="text-orange-400">⚠️ Pontos Fracos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="text-sm text-foreground flex gap-2">
                        <span className="text-red-400">✗</span> {weakness}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* HERÓIS DETECTADOS */}
          <TabsContent value="heroes" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-purple-400">👥 Heróis Detectados</CardTitle>
              </CardHeader>
              <CardContent>
                {analysis.detectedHeroes.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Nenhum herói detectado</p>
                ) : (
                  <div className="space-y-3">
                    {analysis.detectedHeroes.map((hero, idx) => (
                      <div key={idx} className="p-4 bg-background rounded border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-foreground">{hero.name}</p>
                            <p className="text-xs text-muted-foreground">{hero.role}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Confiança</p>
                            <p className="text-sm font-bold text-cyan-400">{Math.round(hero.confidence * 100)}%</p>
                          </div>
                        </div>
                        <div className="w-full bg-background rounded h-2 border border-border">
                          <div
                            className="bg-cyan-500 h-full rounded"
                            style={{ width: `${hero.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* MATCHUPS */}
          <TabsContent value="matchups" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Vence Contra */}
              <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#00d9ff' }}>
                <CardHeader>
                  <CardTitle className="text-cyan-400 flex items-center gap-2">
                    <TrendingUp size={20} /> Vence Contra
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysis.matchups.advantageAgainst.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Nenhum matchup favorável detectado</p>
                  ) : (
                    <ul className="space-y-2">
                      {analysis.matchups.advantageAgainst.map((matchup, idx) => (
                        <li key={idx} className="text-sm text-foreground flex gap-2">
                          <span className="text-green-400">→</span> {matchup}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* Perde Para */}
              <Card className="bg-card border-border border-l-4" style={{ borderLeftColor: '#ff6f00' }}>
                <CardHeader>
                  <CardTitle className="text-orange-400 flex items-center gap-2">
                    <Target size={20} /> Perde Para
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysis.matchups.disadvantageAgainst.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Nenhum matchup desfavorável detectado</p>
                  ) : (
                    <ul className="space-y-2">
                      {analysis.matchups.disadvantageAgainst.map((matchup, idx) => (
                        <li key={idx} className="text-sm text-foreground flex gap-2">
                          <span className="text-red-400">→</span> {matchup}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MELHORIAS */}
          <TabsContent value="improvements" className="space-y-6 mt-6">
            {/* Recomendações Prioritárias */}
            {analysis.recommendations.length > 0 && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-yellow-400">💡 Recomendações Prioritárias</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analysis.recommendations.filter((rec) => typeof rec === 'object' && rec !== null && 'title' in rec).map((rec, idx) => {
                    const recObj = rec as { title: string; description: string; priority: 'high' | 'medium' | 'low' };
                    return (
                      <div key={idx} className="p-4 bg-background rounded border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-foreground">{recObj.title}</p>
                          <Badge className={getPriorityColor(recObj.priority)}>
                            {recObj.priority === 'high' ? 'Alta' : recObj.priority === 'medium' ? 'Média' : 'Baixa'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{recObj.description}</p>
                      </div>
                    );
                  })}

                </CardContent>
              </Card>
            )}

            {/* Próximos Passos */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Curto Prazo */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm text-green-400">⚡ Curto Prazo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {Array.isArray(analysis.nextSteps.shortTerm) && analysis.nextSteps.shortTerm.length > 0 ? (
                      analysis.nextSteps.shortTerm.map((step, idx) => (
                        <li key={idx} className="text-xs text-foreground flex gap-2">
                          <span className="text-green-400">→</span> {step}
                        </li>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">Nenhuma ação de curto prazo</p>
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Médio Prazo */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm text-yellow-400">📈 Médio Prazo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {Array.isArray(analysis.nextSteps.mediumTerm) && analysis.nextSteps.mediumTerm.length > 0 ? (
                      analysis.nextSteps.mediumTerm.map((step, idx) => (
                        <li key={idx} className="text-xs text-foreground flex gap-2">
                          <span className="text-yellow-400">→</span> {step}
                        </li>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">Nenhuma ação de médio prazo</p>
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Longo Prazo */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm text-purple-400">🎯 Longo Prazo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {Array.isArray(analysis.nextSteps.longTerm) && analysis.nextSteps.longTerm.length > 0 ? (
                      analysis.nextSteps.longTerm.map((step, idx) => (
                        <li key={idx} className="text-xs text-foreground flex gap-2">
                          <span className="text-purple-400">→</span> {step}
                        </li>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">Nenhuma ação de longo prazo</p>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Botão para Nova Análise */}
            <Button
              onClick={() => {
                setAnalysis(null);
                setImagePreview(null);
                setError(null);
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              📸 Analisar Outro Esquadrão
            </Button>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
