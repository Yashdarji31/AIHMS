import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Sparkles, Stethoscope, MessageSquare, FileText, ScanText, Activity,
  BedDouble, Pill, Clock, TrendingUp, Play,
} from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/_app/ai-center")({
  head: () => ({ meta: [{ title: "AI Center — AIHMS" }] }),
  component: AICenter,
});

interface AITool {
  key: string;
  icon: LucideIcon;
  title: string;
  description: string;
  api: string;
  placeholder: string;
  sample: string;
}

const tools: AITool[] = [
  { key: "symptom", icon: Stethoscope, title: "AI Symptom Checker", description: "Suggests possible conditions from a symptom description.", api: "POST /ai/symptom-checker", placeholder: "Describe symptoms, duration, severity…", sample: "Likely: viral URI (72%). Rule out: strep pharyngitis, allergic rhinitis." },
  { key: "chat", icon: MessageSquare, title: "Medical Chatbot", description: "24/7 patient-facing conversational assistant.", api: "POST /ai/chat", placeholder: "Ask a medical question…", sample: "Rest, hydrate, monitor fever. Seek care if breathing worsens or fever > 3 days." },
  { key: "doctor", icon: Sparkles, title: "Doctor Assistant (SOAP)", description: "Generates SOAP notes from consultation transcript.", api: "POST /ai/soap-notes", placeholder: "Paste consultation transcript…", sample: "S: chest tightness on exertion. O: BP 142/88, HR 96. A: stable angina, r/o ACS. P: ECG, troponin, cardiology." },
  { key: "summary", icon: FileText, title: "Medical Report Summarizer", description: "Condenses long lab / radiology reports.", api: "POST /ai/summarize", placeholder: "Paste report content…", sample: "CBC: mild microcytic anemia. Recommend iron studies. No leukocytosis." },
  { key: "ocr", icon: ScanText, title: "Prescription OCR", description: "Extracts structured drug list from prescription images.", api: "POST /ai/prescription-ocr", placeholder: "Upload placeholder — attach image…", sample: "1) Amoxicillin 500mg TID × 5d\n2) Paracetamol 500mg SOS" },
  { key: "risk", icon: Activity, title: "Disease Risk Prediction", description: "Estimates 5-year risk from vitals & labs.", api: "POST /ai/risk", placeholder: "Age, BMI, BP, LDL, HbA1c…", sample: "CVD risk 12%, T2D risk 8%. Lifestyle counseling advised." },
  { key: "bed", icon: BedDouble, title: "Bed Occupancy Prediction", description: "Forecasts ward occupancy 24–72 hours ahead.", api: "GET /ai/beds/forecast", placeholder: "Ward filter (optional)", sample: "General ward will peak at 94% Wed 4 PM. Add 4 beds." },
  { key: "inv", icon: Pill, title: "Medicine Inventory Prediction", description: "Predicts stock-outs and reorder windows.", api: "GET /ai/inventory/forecast", placeholder: "SKU or category…", sample: "Amoxicillin 250mg: reorder within 3 days. Metformin 500mg: 6 days." },
  { key: "wait", icon: Clock, title: "Waiting Time Prediction", description: "Estimates OPD queue wait per doctor.", api: "GET /ai/wait", placeholder: "Doctor or department…", sample: "Cardiology OPD: expected wait 18 min. Neurology: 32 min." },
  { key: "readmit", icon: TrendingUp, title: "Readmission Prediction", description: "30-day readmission risk after discharge.", api: "POST /ai/readmission", placeholder: "Patient ID or discharge summary…", sample: "Readmission risk 71%. Suggest post-discharge follow-up in 5 days." },
];

function AICenter() {
  return (
    <div>
      <PageHeader
        title="AI Center"
        description="Clinical & operational AI copilots — every card is API-ready for your model backend."
        actions={<Badge variant="secondary" className="gap-1"><Sparkles className="h-3 w-3" /> 10 models available</Badge>}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((t) => <AICard key={t.key} tool={t} />)}
      </div>
    </div>
  );
}

function AICard({ tool }: { tool: AITool }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setOutput(null);
    await new Promise((r) => setTimeout(r, 700));
    setOutput(tool.sample);
    setConfidence(78 + Math.floor(Math.random() * 20));
    setLoading(false);
    toast.success(`${tool.title} · analysis complete`);
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary"><tool.icon className="h-4 w-4" /></span>
              <span className="truncate">{tool.title}</span>
            </CardTitle>
            <CardDescription className="mt-1">{tool.description}</CardDescription>
          </div>
          <Badge variant="outline" className="shrink-0 font-mono text-[10px]">{tool.api}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <Textarea rows={3} placeholder={tool.placeholder} value={input} onChange={(e) => setInput(e.target.value)} />
        <Button size="sm" onClick={run} disabled={loading} className="self-start">
          <Play className="h-3 w-3" /> {loading ? "Running…" : "Run analysis"}
        </Button>
        <div className="min-h-24 rounded-lg border border-dashed border-border bg-muted/40 p-3 text-sm">
          {output ? (
            <>
              <pre className="whitespace-pre-wrap font-sans text-sm">{output}</pre>
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Confidence</span><span>{confidence}%</span>
                </div>
                <Progress value={confidence} className="h-1.5" />
              </div>
            </>
          ) : (
            <div className="text-xs text-muted-foreground">Output will appear here.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}