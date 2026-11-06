import React from 'react';
import { Composition, getStaticFiles } from 'remotion';
import { FluxoVideo as FluxoVideoV4, FPS, type Dados } from './FluxoVideoV4';
import { FluxoVideo, ABERTURA_FRIA } from './FluxoVideoV5';
import fluxo1 from './gerado/fluxo-1-vendas.json';
import consultor03 from './gerado/consultor-03-comercial.json';
import consultor01 from './gerado/consultor-01-suprimentos.json';
import consultor02 from './gerado/consultor-02-servicos.json';
import consultor04 from './gerado/consultor-04-estoque.json';
import consultor05 from './gerado/consultor-05-producao.json';
import consultor06 from './gerado/consultor-06-expedicao.json';
import consultor09 from './gerado/consultor-09-projetos.json';
import consultor10 from './gerado/consultor-10-tarefas.json';
import consultorCompleto from './gerado/consultor-fluxo-completo.json';
import consultor07 from './gerado/consultor-07-faturamento.json';
import consultor08 from './gerado/consultor-08-financeiro.json';
import sugestaoTags from './gerado/sugestao-tags-financeiro.json';

// Um vídeo por fluxo. Para incluir outro: roteiros/<id>.json → narrar → preparar → importar aqui.
const VIDEOS: Dados[] = [fluxo1 as Dados, consultor03 as Dados, consultor07 as Dados, consultor08 as Dados, consultor01 as Dados, consultor02 as Dados, consultor04 as Dados, consultor05 as Dados, consultor06 as Dados, consultor09 as Dados, consultor10 as Dados, consultorCompleto as Dados,
  sugestaoTags as Dados]; // vídeo interno (sugestão de melhoria), sem voz: não vai para o Guia
const temMusica = (id: string) => getStaticFiles().some((f) => f.name === `musica/${id}.wav`);

export const Root: React.FC = () => (
  <>
    {/* motor v5 (padrão): a abertura fria entra antes do vídeo, por isso os 33 quadros a mais */}
    {VIDEOS.map((d) => (
      <Composition key={d.id} id={d.id} component={FluxoVideo} fps={FPS} width={1920} height={1080}
        durationInFrames={Math.ceil(d.duracaoTotal * FPS) + ABERTURA_FRIA}
        defaultProps={{ dados: d, musica: temMusica(d.id) ? `musica/${d.id}.wav` : undefined }} />
    ))}
    {/* motor v4 (o dos vídeos publicados em 23/10/2026): a mesma lista com o sufixo -v4, para comparar ou voltar */}
    {VIDEOS.map((d) => (
      <Composition key={`${d.id}-v4`} id={`${d.id}-v4`} component={FluxoVideoV4} fps={FPS} width={1920} height={1080}
        durationInFrames={Math.ceil(d.duracaoTotal * FPS)}
        defaultProps={{ dados: d, musica: temMusica(d.id) ? `musica/${d.id}.wav` : undefined }} />
    ))}
  </>
);
