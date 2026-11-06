import React from 'react';
import { Composition, getStaticFiles } from 'remotion';
import { FluxoVideo as FluxoVideoV4, FPS, type Dados } from './FluxoVideoV4';
import { FluxoVideo as FluxoVideoV5 } from './FluxoVideoV5';
import { FluxoVideo, ABERTURA_FRIA } from './FluxoVideoV6';
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
import compraCliente from './gerado/compra-em-nome-do-cliente.json';
import { IntroVideo, type RoteiroIntro } from './IntroVideo';
import introVendas from '../roteiros/intro-vendas.json';
import introCrm from '../roteiros/intro-crm.json';
import introFinanceiro from '../roteiros/intro-financeiro.json';
import introEstoque from '../roteiros/intro-estoque.json';
import introCompras from '../roteiros/intro-compras.json';
import introTarefas from '../roteiros/intro-tarefas.json';
import introFiscal from '../roteiros/intro-fiscal.json';
import introExpedicao from '../roteiros/intro-expedicao.json';
import introProjetos from '../roteiros/intro-projetos.json';
import introServicos from '../roteiros/intro-servicos.json';
import introProducao from '../roteiros/intro-producao.json';
import introRecebimento from '../roteiros/intro-recebimento.json';
import introFundacao from '../roteiros/intro-fundacao.json';
import introPrimeirosPassos from '../roteiros/intro-primeiros-passos.json';

// Um vídeo por fluxo. Para incluir outro: roteiros/<id>.json → narrar → preparar → importar aqui.
const VIDEOS: Dados[] = [fluxo1 as Dados, consultor03 as Dados, consultor07 as Dados, consultor08 as Dados, consultor01 as Dados, consultor02 as Dados, consultor04 as Dados, consultor05 as Dados, consultor06 as Dados, consultor09 as Dados, consultor10 as Dados, consultorCompleto as Dados, compraCliente as Dados];
const temMusica = (id: string) => getStaticFiles().some((f) => f.name === `musica/${id}.wav`);
const props = (d: Dados) => ({ dados: d, musica: temMusica(d.id) ? `musica/${d.id}.wav` : undefined });

export const Root: React.FC = () => (
  <>
    {/* motor v6 (padrão): o v5 sem engasgos. A abertura fria entra antes do vídeo, por isso os 33 quadros a mais */}
    {VIDEOS.map((d) => (
      <Composition key={d.id} id={d.id} component={FluxoVideo} fps={FPS} width={1920} height={1080}
        durationInFrames={Math.ceil(d.duracaoTotal * FPS) + ABERTURA_FRIA} defaultProps={props(d)} />
    ))}
    {/* motor v5 e motor v4 (o dos vídeos publicados em 23/10/2026): a mesma lista com sufixo, para comparar ou voltar */}
    {VIDEOS.map((d) => (
      <Composition key={`${d.id}-v5`} id={`${d.id}-v5`} component={FluxoVideoV5} fps={FPS} width={1920} height={1080}
        durationInFrames={Math.ceil(d.duracaoTotal * FPS) + ABERTURA_FRIA} defaultProps={props(d)} />
    ))}
    {VIDEOS.map((d) => (
      <Composition key={`${d.id}-v4`} id={`${d.id}-v4`} component={FluxoVideoV4} fps={FPS} width={1920} height={1080}
        durationInFrames={Math.ceil(d.duracaoTotal * FPS)} defaultProps={props(d)} />
    ))}
    {/* vídeos de introdução de módulo (sem narração, só música): roteiros/intro-<modulo>.json, ver INTRO-LEIA-ME.md */}
    <Composition id="intro-vendas" component={IntroVideo} fps={introVendas.fps} width={1920} height={1080}
      durationInFrames={Math.round(introVendas.duracao * introVendas.fps)} defaultProps={{ roteiro: introVendas as RoteiroIntro }} />
    <Composition id="intro-crm" component={IntroVideo} fps={introCrm.fps} width={1920} height={1080}
      durationInFrames={Math.round(introCrm.duracao * introCrm.fps)} defaultProps={{ roteiro: introCrm as RoteiroIntro }} />
    <Composition id="intro-financeiro" component={IntroVideo} fps={introFinanceiro.fps} width={1920} height={1080}
      durationInFrames={Math.round(introFinanceiro.duracao * introFinanceiro.fps)} defaultProps={{ roteiro: introFinanceiro as RoteiroIntro }} />
    <Composition id="intro-estoque" component={IntroVideo} fps={introEstoque.fps} width={1920} height={1080}
      durationInFrames={Math.round(introEstoque.duracao * introEstoque.fps)} defaultProps={{ roteiro: introEstoque as RoteiroIntro }} />
    <Composition id="intro-primeiros-passos" component={IntroVideo} fps={introPrimeirosPassos.fps} width={1920} height={1080}
      durationInFrames={Math.round(introPrimeirosPassos.duracao * introPrimeirosPassos.fps)} defaultProps={{ roteiro: introPrimeirosPassos as RoteiroIntro }} />
    <Composition id="intro-fundacao" component={IntroVideo} fps={introFundacao.fps} width={1920} height={1080}
      durationInFrames={Math.round(introFundacao.duracao * introFundacao.fps)} defaultProps={{ roteiro: introFundacao as RoteiroIntro }} />
    <Composition id="intro-recebimento" component={IntroVideo} fps={introRecebimento.fps} width={1920} height={1080}
      durationInFrames={Math.round(introRecebimento.duracao * introRecebimento.fps)} defaultProps={{ roteiro: introRecebimento as RoteiroIntro }} />
    <Composition id="intro-producao" component={IntroVideo} fps={introProducao.fps} width={1920} height={1080}
      durationInFrames={Math.round(introProducao.duracao * introProducao.fps)} defaultProps={{ roteiro: introProducao as RoteiroIntro }} />
    <Composition id="intro-servicos" component={IntroVideo} fps={introServicos.fps} width={1920} height={1080}
      durationInFrames={Math.round(introServicos.duracao * introServicos.fps)} defaultProps={{ roteiro: introServicos as RoteiroIntro }} />
    <Composition id="intro-projetos" component={IntroVideo} fps={introProjetos.fps} width={1920} height={1080}
      durationInFrames={Math.round(introProjetos.duracao * introProjetos.fps)} defaultProps={{ roteiro: introProjetos as RoteiroIntro }} />
    <Composition id="intro-expedicao" component={IntroVideo} fps={introExpedicao.fps} width={1920} height={1080}
      durationInFrames={Math.round(introExpedicao.duracao * introExpedicao.fps)} defaultProps={{ roteiro: introExpedicao as RoteiroIntro }} />
    <Composition id="intro-fiscal" component={IntroVideo} fps={introFiscal.fps} width={1920} height={1080}
      durationInFrames={Math.round(introFiscal.duracao * introFiscal.fps)} defaultProps={{ roteiro: introFiscal as RoteiroIntro }} />
    <Composition id="intro-tarefas" component={IntroVideo} fps={introTarefas.fps} width={1920} height={1080}
      durationInFrames={Math.round(introTarefas.duracao * introTarefas.fps)} defaultProps={{ roteiro: introTarefas as RoteiroIntro }} />
    <Composition id="intro-compras" component={IntroVideo} fps={introCompras.fps} width={1920} height={1080}
      durationInFrames={Math.round(introCompras.duracao * introCompras.fps)} defaultProps={{ roteiro: introCompras as RoteiroIntro }} />
  </>
);
