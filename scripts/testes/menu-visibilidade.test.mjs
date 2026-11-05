/* Menu lateral × perfil (v3.8): estagiário sem Apostila/Acervo; títulos de grupo coerentes. */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  filtrarMenuPorPerfil,
  areaPermitidaComMapa,
  CHAVES_AREA_MENU,
  gruposMenuPadrao,
} from '../../lib/menu-visibilidade.js';

const mapaEstagiario = {
  'area:guia-inicial': true,
  'area:guia-consultor': true,
  'area:pacotes': true,
  'area:checklists': true,
  'area:videos': true,
  'area:apostila': false,
  'area:acervo': false,
};

const mapaConsultor = {
  ...mapaEstagiario,
  'area:apostila': true,
  'area:acervo': true,
};

const mapaAdmin = Object.fromEntries(Object.values(CHAVES_AREA_MENU).map((k) => [k, true]));

const permitida = (mapa) => (area) => areaPermitidaComMapa(mapa, CHAVES_AREA_MENU, area);

describe('filtrarMenuPorPerfil (v3.8)', () => {
  it('estagiário: sem Apostila/Acervo e sem títulos desses grupos; Ferramentas permanece', () => {
    const out = filtrarMenuPorPerfil(gruposMenuPadrao(), permitida(mapaEstagiario));
    const idsGrupo = out.map((g) => g.id);
    assert.deepEqual(idsGrupo, ['principal', 'ferramentas']);
    const ferr = out.find((g) => g.id === 'ferramentas');
    assert.equal(ferr.titulo, 'Ferramentas');
    assert.deepEqual(ferr.itens.map((i) => i.id), ['pacotes', 'checklist', 'videos']);
    assert.ok(!ferr.itens.some((i) => i.id === 'apostila'));
    assert.ok(!out.some((g) => g.id === 'acervo'));
    assert.ok(!out.some((g) => g.titulo === 'Acervo' || g.titulo === 'Introdução'));
  });

  it('estagiário: demais grupos com título preservado quando há item visível', () => {
    const out = filtrarMenuPorPerfil(gruposMenuPadrao(), permitida(mapaEstagiario));
    const ferr = out.find((g) => g.id === 'ferramentas');
    assert.ok(ferr && ferr.titulo === 'Ferramentas' && ferr.itens.length >= 1);
    const princ = out.find((g) => g.id === 'principal');
    assert.ok(princ.itens.some((i) => i.id === 'inicio'));
    assert.equal(princ.titulo, undefined);
  });

  it('consultor vê Apostila, Acervo e o título Acervo', () => {
    const out = filtrarMenuPorPerfil(gruposMenuPadrao(), permitida(mapaConsultor));
    assert.ok(out.some((g) => g.id === 'acervo' && g.titulo === 'Acervo'));
    const ferr = out.find((g) => g.id === 'ferramentas');
    assert.ok(ferr.itens.some((i) => i.id === 'apostila'));
    assert.equal(ferr.titulo, 'Ferramentas');
  });

  it('admin vê tudo (todas as áreas true no mapa)', () => {
    const out = filtrarMenuPorPerfil(gruposMenuPadrao(), permitida(mapaAdmin));
    assert.deepEqual(out.map((g) => g.id), ['principal', 'ferramentas', 'acervo']);
    assert.ok(out.find((g) => g.id === 'ferramentas').itens.some((i) => i.id === 'apostila'));
    assert.ok(out.find((g) => g.id === 'acervo').itens.length >= 1);
  });

  it('grupo sem nenhum item visível some por completo (título incluso)', () => {
    const out = filtrarMenuPorPerfil(
      [{ id: 'x', titulo: 'Só Apostila', itens: [{ id: 'apostila', area: 'apostila' }] }],
      permitida(mapaEstagiario),
    );
    assert.deepEqual(out, []);
  });
});
