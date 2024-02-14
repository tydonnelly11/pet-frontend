;(function () {
   const t = document.createElement('link').relList
   if (t && t.supports && t.supports('modulepreload')) return
   for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r)
   new MutationObserver((r) => {
      for (const o of r)
         if (o.type === 'childList')
            for (const i of o.addedNodes)
               i.tagName === 'LINK' && i.rel === 'modulepreload' && s(i)
   }).observe(document, { childList: !0, subtree: !0 })
   function n(r) {
      const o = {}
      return (
         r.integrity && (o.integrity = r.integrity),
         r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
         r.crossOrigin === 'use-credentials'
            ? (o.credentials = 'include')
            : r.crossOrigin === 'anonymous'
            ? (o.credentials = 'omit')
            : (o.credentials = 'same-origin'),
         o
      )
   }
   function s(r) {
      if (r.ep) return
      r.ep = !0
      const o = n(r)
      fetch(r.href, o)
   }
})()
function Bo(e, t) {
   const n = Object.create(null),
      s = e.split(',')
   for (let r = 0; r < s.length; r++) n[s[r]] = !0
   return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r]
}
const he = {},
   yn = [],
   rt = () => {},
   lf = () => !1,
   cf = /^on[^a-z]/,
   or = (e) => cf.test(e),
   jo = (e) => e.startsWith('onUpdate:'),
   Ae = Object.assign,
   Uo = (e, t) => {
      const n = e.indexOf(t)
      n > -1 && e.splice(n, 1)
   },
   uf = Object.prototype.hasOwnProperty,
   Z = (e, t) => uf.call(e, t),
   j = Array.isArray,
   wn = (e) => ar(e) === '[object Map]',
   Cl = (e) => ar(e) === '[object Set]',
   z = (e) => typeof e == 'function',
   ye = (e) => typeof e == 'string',
   ir = (e) => typeof e == 'symbol',
   pe = (e) => e !== null && typeof e == 'object',
   Nl = (e) => (pe(e) || z(e)) && z(e.then) && z(e.catch),
   xl = Object.prototype.toString,
   ar = (e) => xl.call(e),
   ff = (e) => ar(e).slice(8, -1),
   Rl = (e) => ar(e) === '[object Object]',
   Ko = (e) =>
      ye(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
   Is = Bo(
      ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
   ),
   lr = (e) => {
      const t = Object.create(null)
      return (n) => t[n] || (t[n] = e(n))
   },
   df = /-(\w)/g,
   mt = lr((e) => e.replace(df, (t, n) => (n ? n.toUpperCase() : ''))),
   hf = /\B([A-Z])/g,
   Fn = lr((e) => e.replace(hf, '-$1').toLowerCase()),
   cr = lr((e) => e.charAt(0).toUpperCase() + e.slice(1)),
   Mr = lr((e) => (e ? `on${cr(e)}` : '')),
   rn = (e, t) => !Object.is(e, t),
   Ms = (e, t) => {
      for (let n = 0; n < e.length; n++) e[n](t)
   },
   Ys = (e, t, n) => {
      Object.defineProperty(e, t, {
         configurable: !0,
         enumerable: !1,
         value: n,
      })
   },
   ho = (e) => {
      const t = parseFloat(e)
      return isNaN(t) ? e : t
   }
let Mi
const po = () =>
   Mi ||
   (Mi =
      typeof globalThis < 'u'
         ? globalThis
         : typeof self < 'u'
         ? self
         : typeof window < 'u'
         ? window
         : typeof global < 'u'
         ? global
         : {})
function zo(e) {
   if (j(e)) {
      const t = {}
      for (let n = 0; n < e.length; n++) {
         const s = e[n],
            r = ye(s) ? gf(s) : zo(s)
         if (r) for (const o in r) t[o] = r[o]
      }
      return t
   } else if (ye(e) || pe(e)) return e
}
const pf = /;(?![^(]*\))/g,
   mf = /:([^]+)/,
   _f = /\/\*[^]*?\*\//g
function gf(e) {
   const t = {}
   return (
      e
         .replace(_f, '')
         .split(pf)
         .forEach((n) => {
            if (n) {
               const s = n.split(mf)
               s.length > 1 && (t[s[0].trim()] = s[1].trim())
            }
         }),
      t
   )
}
function qo(e) {
   let t = ''
   if (ye(e)) t = e
   else if (j(e))
      for (let n = 0; n < e.length; n++) {
         const s = qo(e[n])
         s && (t += s + ' ')
      }
   else if (pe(e)) for (const n in e) e[n] && (t += n + ' ')
   return t.trim()
}
const Ef =
      'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
   vf = Bo(Ef)
function Pl(e) {
   return !!e || e === ''
}
const Be = (e) =>
      ye(e)
         ? e
         : e == null
         ? ''
         : j(e) || (pe(e) && (e.toString === xl || !z(e.toString)))
         ? JSON.stringify(e, kl, 2)
         : String(e),
   kl = (e, t) =>
      t && t.__v_isRef
         ? kl(e, t.value)
         : wn(t)
         ? {
              [`Map(${t.size})`]: [...t.entries()].reduce(
                 (n, [s, r]) => ((n[`${s} =>`] = r), n),
                 {}
              ),
           }
         : Cl(t)
         ? { [`Set(${t.size})`]: [...t.values()] }
         : pe(t) && !j(t) && !Rl(t)
         ? String(t)
         : t
let et
class bf {
   constructor(t = !1) {
      ;(this.detached = t),
         (this._active = !0),
         (this.effects = []),
         (this.cleanups = []),
         (this.parent = et),
         !t &&
            et &&
            (this.index = (et.scopes || (et.scopes = [])).push(this) - 1)
   }
   get active() {
      return this._active
   }
   run(t) {
      if (this._active) {
         const n = et
         try {
            return (et = this), t()
         } finally {
            et = n
         }
      }
   }
   on() {
      et = this
   }
   off() {
      et = this.parent
   }
   stop(t) {
      if (this._active) {
         let n, s
         for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop()
         for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]()
         if (this.scopes)
            for (n = 0, s = this.scopes.length; n < s; n++)
               this.scopes[n].stop(!0)
         if (!this.detached && this.parent && !t) {
            const r = this.parent.scopes.pop()
            r &&
               r !== this &&
               ((this.parent.scopes[this.index] = r), (r.index = this.index))
         }
         ;(this.parent = void 0), (this._active = !1)
      }
   }
}
function yf(e, t = et) {
   t && t.active && t.effects.push(e)
}
function wf() {
   return et
}
const Yo = (e) => {
      const t = new Set(e)
      return (t.w = 0), (t.n = 0), t
   },
   Dl = (e) => (e.w & Ht) > 0,
   $l = (e) => (e.n & Ht) > 0,
   Tf = ({ deps: e }) => {
      if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ht
   },
   Af = (e) => {
      const { deps: t } = e
      if (t.length) {
         let n = 0
         for (let s = 0; s < t.length; s++) {
            const r = t[s]
            Dl(r) && !$l(r) ? r.delete(e) : (t[n++] = r),
               (r.w &= ~Ht),
               (r.n &= ~Ht)
         }
         t.length = n
      }
   },
   mo = new WeakMap()
let Zn = 0,
   Ht = 1
const _o = 30
let tt
const en = Symbol(''),
   go = Symbol('')
class Go {
   constructor(t, n = null, s) {
      ;(this.fn = t),
         (this.scheduler = n),
         (this.active = !0),
         (this.deps = []),
         (this.parent = void 0),
         yf(this, s)
   }
   run() {
      if (!this.active) return this.fn()
      let t = tt,
         n = It
      for (; t; ) {
         if (t === this) return
         t = t.parent
      }
      try {
         return (
            (this.parent = tt),
            (tt = this),
            (It = !0),
            (Ht = 1 << ++Zn),
            Zn <= _o ? Tf(this) : Hi(this),
            this.fn()
         )
      } finally {
         Zn <= _o && Af(this),
            (Ht = 1 << --Zn),
            (tt = this.parent),
            (It = n),
            (this.parent = void 0),
            this.deferStop && this.stop()
      }
   }
   stop() {
      tt === this
         ? (this.deferStop = !0)
         : this.active &&
           (Hi(this), this.onStop && this.onStop(), (this.active = !1))
   }
}
function Hi(e) {
   const { deps: t } = e
   if (t.length) {
      for (let n = 0; n < t.length; n++) t[n].delete(e)
      t.length = 0
   }
}
let It = !0
const Ll = []
function Wn() {
   Ll.push(It), (It = !1)
}
function Vn() {
   const e = Ll.pop()
   It = e === void 0 ? !0 : e
}
function Ie(e, t, n) {
   if (It && tt) {
      let s = mo.get(e)
      s || mo.set(e, (s = new Map()))
      let r = s.get(n)
      r || s.set(n, (r = Yo())), Il(r)
   }
}
function Il(e, t) {
   let n = !1
   Zn <= _o ? $l(e) || ((e.n |= Ht), (n = !Dl(e))) : (n = !e.has(tt)),
      n && (e.add(tt), tt.deps.push(e))
}
function wt(e, t, n, s, r, o) {
   const i = mo.get(e)
   if (!i) return
   let a = []
   if (t === 'clear') a = [...i.values()]
   else if (n === 'length' && j(e)) {
      const l = Number(s)
      i.forEach((u, c) => {
         ;(c === 'length' || (!ir(c) && c >= l)) && a.push(u)
      })
   } else
      switch ((n !== void 0 && a.push(i.get(n)), t)) {
         case 'add':
            j(e)
               ? Ko(n) && a.push(i.get('length'))
               : (a.push(i.get(en)), wn(e) && a.push(i.get(go)))
            break
         case 'delete':
            j(e) || (a.push(i.get(en)), wn(e) && a.push(i.get(go)))
            break
         case 'set':
            wn(e) && a.push(i.get(en))
            break
      }
   if (a.length === 1) a[0] && Eo(a[0])
   else {
      const l = []
      for (const u of a) u && l.push(...u)
      Eo(Yo(l))
   }
}
function Eo(e, t) {
   const n = j(e) ? e : [...e]
   for (const s of n) s.computed && Fi(s)
   for (const s of n) s.computed || Fi(s)
}
function Fi(e, t) {
   ;(e !== tt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const Sf = Bo('__proto__,__v_isRef,__isVue'),
   Ml = new Set(
      Object.getOwnPropertyNames(Symbol)
         .filter((e) => e !== 'arguments' && e !== 'caller')
         .map((e) => Symbol[e])
         .filter(ir)
   ),
   Wi = Of()
function Of() {
   const e = {}
   return (
      ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
         e[t] = function (...n) {
            const s = se(this)
            for (let o = 0, i = this.length; o < i; o++) Ie(s, 'get', o + '')
            const r = s[t](...n)
            return r === -1 || r === !1 ? s[t](...n.map(se)) : r
         }
      }),
      ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
         e[t] = function (...n) {
            Wn()
            const s = se(this)[t].apply(this, n)
            return Vn(), s
         }
      }),
      e
   )
}
function Cf(e) {
   const t = se(this)
   return Ie(t, 'has', e), t.hasOwnProperty(e)
}
class Hl {
   constructor(t = !1, n = !1) {
      ;(this._isReadonly = t), (this._shallow = n)
   }
   get(t, n, s) {
      const r = this._isReadonly,
         o = this._shallow
      if (n === '__v_isReactive') return !r
      if (n === '__v_isReadonly') return r
      if (n === '__v_isShallow') return o
      if (n === '__v_raw' && s === (r ? (o ? Wf : Bl) : o ? Vl : Wl).get(t))
         return t
      const i = j(t)
      if (!r) {
         if (i && Z(Wi, n)) return Reflect.get(Wi, n, s)
         if (n === 'hasOwnProperty') return Cf
      }
      const a = Reflect.get(t, n, s)
      return (ir(n) ? Ml.has(n) : Sf(n)) || (r || Ie(t, 'get', n), o)
         ? a
         : Oe(a)
         ? i && Ko(n)
            ? a
            : a.value
         : pe(a)
         ? r
            ? Ul(a)
            : fr(a)
         : a
   }
}
class Fl extends Hl {
   constructor(t = !1) {
      super(!1, t)
   }
   set(t, n, s, r) {
      let o = t[n]
      if (On(o) && Oe(o) && !Oe(s)) return !1
      if (
         !this._shallow &&
         (!Gs(s) && !On(s) && ((o = se(o)), (s = se(s))),
         !j(t) && Oe(o) && !Oe(s))
      )
         return (o.value = s), !0
      const i = j(t) && Ko(n) ? Number(n) < t.length : Z(t, n),
         a = Reflect.set(t, n, s, r)
      return (
         t === se(r) &&
            (i ? rn(s, o) && wt(t, 'set', n, s) : wt(t, 'add', n, s)),
         a
      )
   }
   deleteProperty(t, n) {
      const s = Z(t, n)
      t[n]
      const r = Reflect.deleteProperty(t, n)
      return r && s && wt(t, 'delete', n, void 0), r
   }
   has(t, n) {
      const s = Reflect.has(t, n)
      return (!ir(n) || !Ml.has(n)) && Ie(t, 'has', n), s
   }
   ownKeys(t) {
      return Ie(t, 'iterate', j(t) ? 'length' : en), Reflect.ownKeys(t)
   }
}
class Nf extends Hl {
   constructor(t = !1) {
      super(!0, t)
   }
   set(t, n) {
      return !0
   }
   deleteProperty(t, n) {
      return !0
   }
}
const xf = new Fl(),
   Rf = new Nf(),
   Pf = new Fl(!0),
   Jo = (e) => e,
   ur = (e) => Reflect.getPrototypeOf(e)
function Ts(e, t, n = !1, s = !1) {
   e = e.__v_raw
   const r = se(e),
      o = se(t)
   n || (rn(t, o) && Ie(r, 'get', t), Ie(r, 'get', o))
   const { has: i } = ur(r),
      a = s ? Jo : n ? Zo : as
   if (i.call(r, t)) return a(e.get(t))
   if (i.call(r, o)) return a(e.get(o))
   e !== r && e.get(t)
}
function As(e, t = !1) {
   const n = this.__v_raw,
      s = se(n),
      r = se(e)
   return (
      t || (rn(e, r) && Ie(s, 'has', e), Ie(s, 'has', r)),
      e === r ? n.has(e) : n.has(e) || n.has(r)
   )
}
function Ss(e, t = !1) {
   return (
      (e = e.__v_raw), !t && Ie(se(e), 'iterate', en), Reflect.get(e, 'size', e)
   )
}
function Vi(e) {
   e = se(e)
   const t = se(this)
   return ur(t).has.call(t, e) || (t.add(e), wt(t, 'add', e, e)), this
}
function Bi(e, t) {
   t = se(t)
   const n = se(this),
      { has: s, get: r } = ur(n)
   let o = s.call(n, e)
   o || ((e = se(e)), (o = s.call(n, e)))
   const i = r.call(n, e)
   return (
      n.set(e, t), o ? rn(t, i) && wt(n, 'set', e, t) : wt(n, 'add', e, t), this
   )
}
function ji(e) {
   const t = se(this),
      { has: n, get: s } = ur(t)
   let r = n.call(t, e)
   r || ((e = se(e)), (r = n.call(t, e))), s && s.call(t, e)
   const o = t.delete(e)
   return r && wt(t, 'delete', e, void 0), o
}
function Ui() {
   const e = se(this),
      t = e.size !== 0,
      n = e.clear()
   return t && wt(e, 'clear', void 0, void 0), n
}
function Os(e, t) {
   return function (s, r) {
      const o = this,
         i = o.__v_raw,
         a = se(i),
         l = t ? Jo : e ? Zo : as
      return (
         !e && Ie(a, 'iterate', en),
         i.forEach((u, c) => s.call(r, l(u), l(c), o))
      )
   }
}
function Cs(e, t, n) {
   return function (...s) {
      const r = this.__v_raw,
         o = se(r),
         i = wn(o),
         a = e === 'entries' || (e === Symbol.iterator && i),
         l = e === 'keys' && i,
         u = r[e](...s),
         c = n ? Jo : t ? Zo : as
      return (
         !t && Ie(o, 'iterate', l ? go : en),
         {
            next() {
               const { value: d, done: p } = u.next()
               return p
                  ? { value: d, done: p }
                  : { value: a ? [c(d[0]), c(d[1])] : c(d), done: p }
            },
            [Symbol.iterator]() {
               return this
            },
         }
      )
   }
}
function Rt(e) {
   return function (...t) {
      return e === 'delete' ? !1 : this
   }
}
function kf() {
   const e = {
         get(o) {
            return Ts(this, o)
         },
         get size() {
            return Ss(this)
         },
         has: As,
         add: Vi,
         set: Bi,
         delete: ji,
         clear: Ui,
         forEach: Os(!1, !1),
      },
      t = {
         get(o) {
            return Ts(this, o, !1, !0)
         },
         get size() {
            return Ss(this)
         },
         has: As,
         add: Vi,
         set: Bi,
         delete: ji,
         clear: Ui,
         forEach: Os(!1, !0),
      },
      n = {
         get(o) {
            return Ts(this, o, !0)
         },
         get size() {
            return Ss(this, !0)
         },
         has(o) {
            return As.call(this, o, !0)
         },
         add: Rt('add'),
         set: Rt('set'),
         delete: Rt('delete'),
         clear: Rt('clear'),
         forEach: Os(!0, !1),
      },
      s = {
         get(o) {
            return Ts(this, o, !0, !0)
         },
         get size() {
            return Ss(this, !0)
         },
         has(o) {
            return As.call(this, o, !0)
         },
         add: Rt('add'),
         set: Rt('set'),
         delete: Rt('delete'),
         clear: Rt('clear'),
         forEach: Os(!0, !0),
      }
   return (
      ['keys', 'values', 'entries', Symbol.iterator].forEach((o) => {
         ;(e[o] = Cs(o, !1, !1)),
            (n[o] = Cs(o, !0, !1)),
            (t[o] = Cs(o, !1, !0)),
            (s[o] = Cs(o, !0, !0))
      }),
      [e, n, t, s]
   )
}
const [Df, $f, Lf, If] = kf()
function Xo(e, t) {
   const n = t ? (e ? If : Lf) : e ? $f : Df
   return (s, r, o) =>
      r === '__v_isReactive'
         ? !e
         : r === '__v_isReadonly'
         ? e
         : r === '__v_raw'
         ? s
         : Reflect.get(Z(n, r) && r in s ? n : s, r, o)
}
const Mf = { get: Xo(!1, !1) },
   Hf = { get: Xo(!1, !0) },
   Ff = { get: Xo(!0, !1) },
   Wl = new WeakMap(),
   Vl = new WeakMap(),
   Bl = new WeakMap(),
   Wf = new WeakMap()
function Vf(e) {
   switch (e) {
      case 'Object':
      case 'Array':
         return 1
      case 'Map':
      case 'Set':
      case 'WeakMap':
      case 'WeakSet':
         return 2
      default:
         return 0
   }
}
function Bf(e) {
   return e.__v_skip || !Object.isExtensible(e) ? 0 : Vf(ff(e))
}
function fr(e) {
   return On(e) ? e : Qo(e, !1, xf, Mf, Wl)
}
function jl(e) {
   return Qo(e, !1, Pf, Hf, Vl)
}
function Ul(e) {
   return Qo(e, !0, Rf, Ff, Bl)
}
function Qo(e, t, n, s, r) {
   if (!pe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
   const o = r.get(e)
   if (o) return o
   const i = Bf(e)
   if (i === 0) return e
   const a = new Proxy(e, i === 2 ? s : n)
   return r.set(e, a), a
}
function Tn(e) {
   return On(e) ? Tn(e.__v_raw) : !!(e && e.__v_isReactive)
}
function On(e) {
   return !!(e && e.__v_isReadonly)
}
function Gs(e) {
   return !!(e && e.__v_isShallow)
}
function Kl(e) {
   return Tn(e) || On(e)
}
function se(e) {
   const t = e && e.__v_raw
   return t ? se(t) : e
}
function zl(e) {
   return Ys(e, '__v_skip', !0), e
}
const as = (e) => (pe(e) ? fr(e) : e),
   Zo = (e) => (pe(e) ? Ul(e) : e)
function ql(e) {
   It && tt && ((e = se(e)), Il(e.dep || (e.dep = Yo())))
}
function Yl(e, t) {
   e = se(e)
   const n = e.dep
   n && Eo(n)
}
function Oe(e) {
   return !!(e && e.__v_isRef === !0)
}
function ms(e) {
   return Gl(e, !1)
}
function jf(e) {
   return Gl(e, !0)
}
function Gl(e, t) {
   return Oe(e) ? e : new Uf(e, t)
}
class Uf {
   constructor(t, n) {
      ;(this.__v_isShallow = n),
         (this.dep = void 0),
         (this.__v_isRef = !0),
         (this._rawValue = n ? t : se(t)),
         (this._value = n ? t : as(t))
   }
   get value() {
      return ql(this), this._value
   }
   set value(t) {
      const n = this.__v_isShallow || Gs(t) || On(t)
      ;(t = n ? t : se(t)),
         rn(t, this._rawValue) &&
            ((this._rawValue = t), (this._value = n ? t : as(t)), Yl(this))
   }
}
function An(e) {
   return Oe(e) ? e.value : e
}
const Kf = {
   get: (e, t, n) => An(Reflect.get(e, t, n)),
   set: (e, t, n, s) => {
      const r = e[t]
      return Oe(r) && !Oe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s)
   },
}
function Jl(e) {
   return Tn(e) ? e : new Proxy(e, Kf)
}
class zf {
   constructor(t, n, s, r) {
      ;(this._setter = n),
         (this.dep = void 0),
         (this.__v_isRef = !0),
         (this.__v_isReadonly = !1),
         (this._dirty = !0),
         (this.effect = new Go(t, () => {
            this._dirty || ((this._dirty = !0), Yl(this))
         })),
         (this.effect.computed = this),
         (this.effect.active = this._cacheable = !r),
         (this.__v_isReadonly = s)
   }
   get value() {
      const t = se(this)
      return (
         ql(t),
         (t._dirty || !t._cacheable) &&
            ((t._dirty = !1), (t._value = t.effect.run())),
         t._value
      )
   }
   set value(t) {
      this._setter(t)
   }
}
function qf(e, t, n = !1) {
   let s, r
   const o = z(e)
   return (
      o ? ((s = e), (r = rt)) : ((s = e.get), (r = e.set)),
      new zf(s, r, o || !r, n)
   )
}
function Mt(e, t, n, s) {
   let r
   try {
      r = s ? e(...s) : e()
   } catch (o) {
      dr(o, t, n)
   }
   return r
}
function ot(e, t, n, s) {
   if (z(e)) {
      const o = Mt(e, t, n, s)
      return (
         o &&
            Nl(o) &&
            o.catch((i) => {
               dr(i, t, n)
            }),
         o
      )
   }
   const r = []
   for (let o = 0; o < e.length; o++) r.push(ot(e[o], t, n, s))
   return r
}
function dr(e, t, n, s = !0) {
   const r = t ? t.vnode : null
   if (t) {
      let o = t.parent
      const i = t.proxy,
         a = n
      for (; o; ) {
         const u = o.ec
         if (u) {
            for (let c = 0; c < u.length; c++) if (u[c](e, i, a) === !1) return
         }
         o = o.parent
      }
      const l = t.appContext.config.errorHandler
      if (l) {
         Mt(l, null, 10, [e, i, a])
         return
      }
   }
   Yf(e, n, r, s)
}
function Yf(e, t, n, s = !0) {
   console.error(e)
}
let ls = !1,
   vo = !1
const Se = []
let ft = 0
const Sn = []
let vt = null,
   qt = 0
const Xl = Promise.resolve()
let ei = null
function Ql(e) {
   const t = ei || Xl
   return e ? t.then(this ? e.bind(this) : e) : t
}
function Gf(e) {
   let t = ft + 1,
      n = Se.length
   for (; t < n; ) {
      const s = (t + n) >>> 1,
         r = Se[s],
         o = cs(r)
      o < e || (o === e && r.pre) ? (t = s + 1) : (n = s)
   }
   return t
}
function ti(e) {
   ;(!Se.length || !Se.includes(e, ls && e.allowRecurse ? ft + 1 : ft)) &&
      (e.id == null ? Se.push(e) : Se.splice(Gf(e.id), 0, e), Zl())
}
function Zl() {
   !ls && !vo && ((vo = !0), (ei = Xl.then(tc)))
}
function Jf(e) {
   const t = Se.indexOf(e)
   t > ft && Se.splice(t, 1)
}
function Xf(e) {
   j(e)
      ? Sn.push(...e)
      : (!vt || !vt.includes(e, e.allowRecurse ? qt + 1 : qt)) && Sn.push(e),
      Zl()
}
function Ki(e, t = ls ? ft + 1 : 0) {
   for (; t < Se.length; t++) {
      const n = Se[t]
      n && n.pre && (Se.splice(t, 1), t--, n())
   }
}
function ec(e) {
   if (Sn.length) {
      const t = [...new Set(Sn)]
      if (((Sn.length = 0), vt)) {
         vt.push(...t)
         return
      }
      for (
         vt = t, vt.sort((n, s) => cs(n) - cs(s)), qt = 0;
         qt < vt.length;
         qt++
      )
         vt[qt]()
      ;(vt = null), (qt = 0)
   }
}
const cs = (e) => (e.id == null ? 1 / 0 : e.id),
   Qf = (e, t) => {
      const n = cs(e) - cs(t)
      if (n === 0) {
         if (e.pre && !t.pre) return -1
         if (t.pre && !e.pre) return 1
      }
      return n
   }
function tc(e) {
   ;(vo = !1), (ls = !0), Se.sort(Qf)
   const t = rt
   try {
      for (ft = 0; ft < Se.length; ft++) {
         const n = Se[ft]
         n && n.active !== !1 && Mt(n, null, 14)
      }
   } finally {
      ;(ft = 0),
         (Se.length = 0),
         ec(),
         (ls = !1),
         (ei = null),
         (Se.length || Sn.length) && tc()
   }
}
function Zf(e, t, ...n) {
   if (e.isUnmounted) return
   const s = e.vnode.props || he
   let r = n
   const o = t.startsWith('update:'),
      i = o && t.slice(7)
   if (i && i in s) {
      const c = `${i === 'modelValue' ? 'model' : i}Modifiers`,
         { number: d, trim: p } = s[c] || he
      p && (r = n.map((_) => (ye(_) ? _.trim() : _))), d && (r = n.map(ho))
   }
   let a,
      l = s[(a = Mr(t))] || s[(a = Mr(mt(t)))]
   !l && o && (l = s[(a = Mr(Fn(t)))]), l && ot(l, e, 6, r)
   const u = s[a + 'Once']
   if (u) {
      if (!e.emitted) e.emitted = {}
      else if (e.emitted[a]) return
      ;(e.emitted[a] = !0), ot(u, e, 6, r)
   }
}
function nc(e, t, n = !1) {
   const s = t.emitsCache,
      r = s.get(e)
   if (r !== void 0) return r
   const o = e.emits
   let i = {},
      a = !1
   if (!z(e)) {
      const l = (u) => {
         const c = nc(u, t, !0)
         c && ((a = !0), Ae(i, c))
      }
      !n && t.mixins.length && t.mixins.forEach(l),
         e.extends && l(e.extends),
         e.mixins && e.mixins.forEach(l)
   }
   return !o && !a
      ? (pe(e) && s.set(e, null), null)
      : (j(o) ? o.forEach((l) => (i[l] = null)) : Ae(i, o),
        pe(e) && s.set(e, i),
        i)
}
function hr(e, t) {
   return !e || !or(t)
      ? !1
      : ((t = t.slice(2).replace(/Once$/, '')),
        Z(e, t[0].toLowerCase() + t.slice(1)) || Z(e, Fn(t)) || Z(e, t))
}
let ze = null,
   pr = null
function Js(e) {
   const t = ze
   return (ze = e), (pr = (e && e.type.__scopeId) || null), t
}
function mr(e) {
   pr = e
}
function _r() {
   pr = null
}
function Gt(e, t = ze, n) {
   if (!t || e._n) return e
   const s = (...r) => {
      s._d && na(-1)
      const o = Js(t)
      let i
      try {
         i = e(...r)
      } finally {
         Js(o), s._d && na(1)
      }
      return i
   }
   return (s._n = !0), (s._c = !0), (s._d = !0), s
}
function Hr(e) {
   const {
      type: t,
      vnode: n,
      proxy: s,
      withProxy: r,
      props: o,
      propsOptions: [i],
      slots: a,
      attrs: l,
      emit: u,
      render: c,
      renderCache: d,
      data: p,
      setupState: _,
      ctx: g,
      inheritAttrs: E,
   } = e
   let O, N
   const P = Js(e)
   try {
      if (n.shapeFlag & 4) {
         const C = r || s
         ;(O = ut(c.call(C, C, d, o, _, p, g))), (N = l)
      } else {
         const C = t
         ;(O = ut(
            C.length > 1 ? C(o, { attrs: l, slots: a, emit: u }) : C(o, null)
         )),
            (N = t.props ? l : ed(l))
      }
   } catch (C) {
      ;(ns.length = 0), dr(C, e, 1), (O = oe(on))
   }
   let M = O
   if (N && E !== !1) {
      const C = Object.keys(N),
         { shapeFlag: U } = M
      C.length && U & 7 && (i && C.some(jo) && (N = td(N, i)), (M = Cn(M, N)))
   }
   return (
      n.dirs &&
         ((M = Cn(M)), (M.dirs = M.dirs ? M.dirs.concat(n.dirs) : n.dirs)),
      n.transition && (M.transition = n.transition),
      (O = M),
      Js(P),
      O
   )
}
const ed = (e) => {
      let t
      for (const n in e)
         (n === 'class' || n === 'style' || or(n)) &&
            ((t || (t = {}))[n] = e[n])
      return t
   },
   td = (e, t) => {
      const n = {}
      for (const s in e) (!jo(s) || !(s.slice(9) in t)) && (n[s] = e[s])
      return n
   }
function nd(e, t, n) {
   const { props: s, children: r, component: o } = e,
      { props: i, children: a, patchFlag: l } = t,
      u = o.emitsOptions
   if (t.dirs || t.transition) return !0
   if (n && l >= 0) {
      if (l & 1024) return !0
      if (l & 16) return s ? zi(s, i, u) : !!i
      if (l & 8) {
         const c = t.dynamicProps
         for (let d = 0; d < c.length; d++) {
            const p = c[d]
            if (i[p] !== s[p] && !hr(u, p)) return !0
         }
      }
   } else
      return (r || a) && (!a || !a.$stable)
         ? !0
         : s === i
         ? !1
         : s
         ? i
            ? zi(s, i, u)
            : !0
         : !!i
   return !1
}
function zi(e, t, n) {
   const s = Object.keys(t)
   if (s.length !== Object.keys(e).length) return !0
   for (let r = 0; r < s.length; r++) {
      const o = s[r]
      if (t[o] !== e[o] && !hr(n, o)) return !0
   }
   return !1
}
function sd({ vnode: e, parent: t }, n) {
   for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent)
}
const rd = (e) => e.__isSuspense
function od(e, t) {
   t && t.pendingBranch
      ? j(e)
         ? t.effects.push(...e)
         : t.effects.push(e)
      : Xf(e)
}
const Ns = {}
function Hs(e, t, n) {
   return sc(e, t, n)
}
function sc(
   e,
   t,
   { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = he
) {
   var a
   const l = wf() === ((a = Te) == null ? void 0 : a.scope) ? Te : null
   let u,
      c = !1,
      d = !1
   if (
      (Oe(e)
         ? ((u = () => e.value), (c = Gs(e)))
         : Tn(e)
         ? ((u = () => e), (s = !0))
         : j(e)
         ? ((d = !0),
           (c = e.some((C) => Tn(C) || Gs(C))),
           (u = () =>
              e.map((C) => {
                 if (Oe(C)) return C.value
                 if (Tn(C)) return Jt(C)
                 if (z(C)) return Mt(C, l, 2)
              })))
         : z(e)
         ? t
            ? (u = () => Mt(e, l, 2))
            : (u = () => {
                 if (!(l && l.isUnmounted)) return p && p(), ot(e, l, 3, [_])
              })
         : (u = rt),
      t && s)
   ) {
      const C = u
      u = () => Jt(C())
   }
   let p,
      _ = (C) => {
         p = P.onStop = () => {
            Mt(C, l, 4)
         }
      },
      g
   if (fs)
      if (
         ((_ = rt),
         t ? n && ot(t, l, 3, [u(), d ? [] : void 0, _]) : u(),
         r === 'sync')
      ) {
         const C = eh()
         g = C.__watcherHandles || (C.__watcherHandles = [])
      } else return rt
   let E = d ? new Array(e.length).fill(Ns) : Ns
   const O = () => {
      if (P.active)
         if (t) {
            const C = P.run()
            ;(s || c || (d ? C.some((U, K) => rn(U, E[K])) : rn(C, E))) &&
               (p && p(),
               ot(t, l, 3, [
                  C,
                  E === Ns ? void 0 : d && E[0] === Ns ? [] : E,
                  _,
               ]),
               (E = C))
         } else P.run()
   }
   O.allowRecurse = !!t
   let N
   r === 'sync'
      ? (N = O)
      : r === 'post'
      ? (N = () => De(O, l && l.suspense))
      : ((O.pre = !0), l && (O.id = l.uid), (N = () => ti(O)))
   const P = new Go(u, N)
   t
      ? n
         ? O()
         : (E = P.run())
      : r === 'post'
      ? De(P.run.bind(P), l && l.suspense)
      : P.run()
   const M = () => {
      P.stop(), l && l.scope && Uo(l.scope.effects, P)
   }
   return g && g.push(M), M
}
function id(e, t, n) {
   const s = this.proxy,
      r = ye(e) ? (e.includes('.') ? rc(s, e) : () => s[e]) : e.bind(s, s)
   let o
   z(t) ? (o = t) : ((o = t.handler), (n = t))
   const i = Te
   Nn(this)
   const a = sc(r, o.bind(s), n)
   return i ? Nn(i) : nn(), a
}
function rc(e, t) {
   const n = t.split('.')
   return () => {
      let s = e
      for (let r = 0; r < n.length && s; r++) s = s[n[r]]
      return s
   }
}
function Jt(e, t) {
   if (!pe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e
   if ((t.add(e), Oe(e))) Jt(e.value, t)
   else if (j(e)) for (let n = 0; n < e.length; n++) Jt(e[n], t)
   else if (Cl(e) || wn(e))
      e.forEach((n) => {
         Jt(n, t)
      })
   else if (Rl(e)) for (const n in e) Jt(e[n], t)
   return e
}
function bt(e, t) {
   const n = ze
   if (n === null) return e
   const s = br(n) || n.proxy,
      r = e.dirs || (e.dirs = [])
   for (let o = 0; o < t.length; o++) {
      let [i, a, l, u = he] = t[o]
      i &&
         (z(i) && (i = { mounted: i, updated: i }),
         i.deep && Jt(a),
         r.push({
            dir: i,
            instance: s,
            value: a,
            oldValue: void 0,
            arg: l,
            modifiers: u,
         }))
   }
   return e
}
function Kt(e, t, n, s) {
   const r = e.dirs,
      o = t && t.dirs
   for (let i = 0; i < r.length; i++) {
      const a = r[i]
      o && (a.oldValue = o[i].value)
      let l = a.dir[s]
      l && (Wn(), ot(l, n, 8, [e.el, a, e, t]), Vn())
   }
}
/*! #__NO_SIDE_EFFECTS__ */ function oc(e, t) {
   return z(e) ? (() => Ae({ name: e.name }, t, { setup: e }))() : e
}
const Fs = (e) => !!e.type.__asyncLoader,
   ic = (e) => e.type.__isKeepAlive
function ad(e, t) {
   ac(e, 'a', t)
}
function ld(e, t) {
   ac(e, 'da', t)
}
function ac(e, t, n = Te) {
   const s =
      e.__wdc ||
      (e.__wdc = () => {
         let r = n
         for (; r; ) {
            if (r.isDeactivated) return
            r = r.parent
         }
         return e()
      })
   if ((gr(t, s, n), n)) {
      let r = n.parent
      for (; r && r.parent; )
         ic(r.parent.vnode) && cd(s, t, n, r), (r = r.parent)
   }
}
function cd(e, t, n, s) {
   const r = gr(t, e, s, !0)
   lc(() => {
      Uo(s[t], r)
   }, n)
}
function gr(e, t, n = Te, s = !1) {
   if (n) {
      const r = n[e] || (n[e] = []),
         o =
            t.__weh ||
            (t.__weh = (...i) => {
               if (n.isUnmounted) return
               Wn(), Nn(n)
               const a = ot(t, n, e, i)
               return nn(), Vn(), a
            })
      return s ? r.unshift(o) : r.push(o), o
   }
}
const Nt =
      (e) =>
      (t, n = Te) =>
         (!fs || e === 'sp') && gr(e, (...s) => t(...s), n),
   ud = Nt('bm'),
   fd = Nt('m'),
   dd = Nt('bu'),
   hd = Nt('u'),
   pd = Nt('bum'),
   lc = Nt('um'),
   md = Nt('sp'),
   _d = Nt('rtg'),
   gd = Nt('rtc')
function Ed(e, t = Te) {
   gr('ec', e, t)
}
const cc = 'components'
function Le(e, t) {
   return bd(cc, e, !0, t) || e
}
const vd = Symbol.for('v-ndc')
function bd(e, t, n = !0, s = !1) {
   const r = ze || Te
   if (r) {
      const o = r.type
      if (e === cc) {
         const a = Xd(o, !1)
         if (a && (a === t || a === mt(t) || a === cr(mt(t)))) return o
      }
      const i = qi(r[e] || o[e], t) || qi(r.appContext[e], t)
      return !i && s ? o : i
   }
}
function qi(e, t) {
   return e && (e[t] || e[mt(t)] || e[cr(mt(t))])
}
function tn(e, t, n, s) {
   let r
   const o = n && n[s]
   if (j(e) || ye(e)) {
      r = new Array(e.length)
      for (let i = 0, a = e.length; i < a; i++)
         r[i] = t(e[i], i, void 0, o && o[i])
   } else if (typeof e == 'number') {
      r = new Array(e)
      for (let i = 0; i < e; i++) r[i] = t(i + 1, i, void 0, o && o[i])
   } else if (pe(e))
      if (e[Symbol.iterator])
         r = Array.from(e, (i, a) => t(i, a, void 0, o && o[a]))
      else {
         const i = Object.keys(e)
         r = new Array(i.length)
         for (let a = 0, l = i.length; a < l; a++) {
            const u = i[a]
            r[a] = t(e[u], u, a, o && o[a])
         }
      }
   else r = []
   return n && (n[s] = r), r
}
const bo = (e) => (e ? (bc(e) ? br(e) || e.proxy : bo(e.parent)) : null),
   ts = Ae(Object.create(null), {
      $: (e) => e,
      $el: (e) => e.vnode.el,
      $data: (e) => e.data,
      $props: (e) => e.props,
      $attrs: (e) => e.attrs,
      $slots: (e) => e.slots,
      $refs: (e) => e.refs,
      $parent: (e) => bo(e.parent),
      $root: (e) => bo(e.root),
      $emit: (e) => e.emit,
      $options: (e) => ni(e),
      $forceUpdate: (e) => e.f || (e.f = () => ti(e.update)),
      $nextTick: (e) => e.n || (e.n = Ql.bind(e.proxy)),
      $watch: (e) => id.bind(e),
   }),
   Fr = (e, t) => e !== he && !e.__isScriptSetup && Z(e, t),
   yd = {
      get({ _: e }, t) {
         const {
            ctx: n,
            setupState: s,
            data: r,
            props: o,
            accessCache: i,
            type: a,
            appContext: l,
         } = e
         let u
         if (t[0] !== '$') {
            const _ = i[t]
            if (_ !== void 0)
               switch (_) {
                  case 1:
                     return s[t]
                  case 2:
                     return r[t]
                  case 4:
                     return n[t]
                  case 3:
                     return o[t]
               }
            else {
               if (Fr(s, t)) return (i[t] = 1), s[t]
               if (r !== he && Z(r, t)) return (i[t] = 2), r[t]
               if ((u = e.propsOptions[0]) && Z(u, t)) return (i[t] = 3), o[t]
               if (n !== he && Z(n, t)) return (i[t] = 4), n[t]
               yo && (i[t] = 0)
            }
         }
         const c = ts[t]
         let d, p
         if (c) return t === '$attrs' && Ie(e, 'get', t), c(e)
         if ((d = a.__cssModules) && (d = d[t])) return d
         if (n !== he && Z(n, t)) return (i[t] = 4), n[t]
         if (((p = l.config.globalProperties), Z(p, t))) return p[t]
      },
      set({ _: e }, t, n) {
         const { data: s, setupState: r, ctx: o } = e
         return Fr(r, t)
            ? ((r[t] = n), !0)
            : s !== he && Z(s, t)
            ? ((s[t] = n), !0)
            : Z(e.props, t) || (t[0] === '$' && t.slice(1) in e)
            ? !1
            : ((o[t] = n), !0)
      },
      has(
         {
            _: {
               data: e,
               setupState: t,
               accessCache: n,
               ctx: s,
               appContext: r,
               propsOptions: o,
            },
         },
         i
      ) {
         let a
         return (
            !!n[i] ||
            (e !== he && Z(e, i)) ||
            Fr(t, i) ||
            ((a = o[0]) && Z(a, i)) ||
            Z(s, i) ||
            Z(ts, i) ||
            Z(r.config.globalProperties, i)
         )
      },
      defineProperty(e, t, n) {
         return (
            n.get != null
               ? (e._.accessCache[t] = 0)
               : Z(n, 'value') && this.set(e, t, n.value, null),
            Reflect.defineProperty(e, t, n)
         )
      },
   }
function Yi(e) {
   return j(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let yo = !0
function wd(e) {
   const t = ni(e),
      n = e.proxy,
      s = e.ctx
   ;(yo = !1), t.beforeCreate && Gi(t.beforeCreate, e, 'bc')
   const {
      data: r,
      computed: o,
      methods: i,
      watch: a,
      provide: l,
      inject: u,
      created: c,
      beforeMount: d,
      mounted: p,
      beforeUpdate: _,
      updated: g,
      activated: E,
      deactivated: O,
      beforeDestroy: N,
      beforeUnmount: P,
      destroyed: M,
      unmounted: C,
      render: U,
      renderTracked: K,
      renderTriggered: Q,
      errorCaptured: ce,
      serverPrefetch: fe,
      expose: re,
      inheritAttrs: de,
      components: ve,
      directives: ue,
      filters: Me,
   } = t
   if ((u && Td(u, s, null), i))
      for (const q in i) {
         const G = i[q]
         z(G) && (s[q] = G.bind(n))
      }
   if (r) {
      const q = r.call(n, n)
      pe(q) && (e.data = fr(q))
   }
   if (((yo = !0), o))
      for (const q in o) {
         const G = o[q],
            we = z(G) ? G.bind(n, n) : z(G.get) ? G.get.bind(n, n) : rt,
            He = !z(G) && z(G.set) ? G.set.bind(n) : rt,
            ke = nt({ get: we, set: He })
         Object.defineProperty(s, q, {
            enumerable: !0,
            configurable: !0,
            get: () => ke.value,
            set: (_e) => (ke.value = _e),
         })
      }
   if (a) for (const q in a) uc(a[q], s, n, q)
   if (l) {
      const q = z(l) ? l.call(n) : l
      Reflect.ownKeys(q).forEach((G) => {
         Ws(G, q[G])
      })
   }
   c && Gi(c, e, 'c')
   function ee(q, G) {
      j(G) ? G.forEach((we) => q(we.bind(n))) : G && q(G.bind(n))
   }
   if (
      (ee(ud, d),
      ee(fd, p),
      ee(dd, _),
      ee(hd, g),
      ee(ad, E),
      ee(ld, O),
      ee(Ed, ce),
      ee(gd, K),
      ee(_d, Q),
      ee(pd, P),
      ee(lc, C),
      ee(md, fe),
      j(re))
   )
      if (re.length) {
         const q = e.exposed || (e.exposed = {})
         re.forEach((G) => {
            Object.defineProperty(q, G, {
               get: () => n[G],
               set: (we) => (n[G] = we),
            })
         })
      } else e.exposed || (e.exposed = {})
   U && e.render === rt && (e.render = U),
      de != null && (e.inheritAttrs = de),
      ve && (e.components = ve),
      ue && (e.directives = ue)
}
function Td(e, t, n = rt) {
   j(e) && (e = wo(e))
   for (const s in e) {
      const r = e[s]
      let o
      pe(r)
         ? 'default' in r
            ? (o = Tt(r.from || s, r.default, !0))
            : (o = Tt(r.from || s))
         : (o = Tt(r)),
         Oe(o)
            ? Object.defineProperty(t, s, {
                 enumerable: !0,
                 configurable: !0,
                 get: () => o.value,
                 set: (i) => (o.value = i),
              })
            : (t[s] = o)
   }
}
function Gi(e, t, n) {
   ot(j(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function uc(e, t, n, s) {
   const r = s.includes('.') ? rc(n, s) : () => n[s]
   if (ye(e)) {
      const o = t[e]
      z(o) && Hs(r, o)
   } else if (z(e)) Hs(r, e.bind(n))
   else if (pe(e))
      if (j(e)) e.forEach((o) => uc(o, t, n, s))
      else {
         const o = z(e.handler) ? e.handler.bind(n) : t[e.handler]
         z(o) && Hs(r, o, e)
      }
}
function ni(e) {
   const t = e.type,
      { mixins: n, extends: s } = t,
      {
         mixins: r,
         optionsCache: o,
         config: { optionMergeStrategies: i },
      } = e.appContext,
      a = o.get(t)
   let l
   return (
      a
         ? (l = a)
         : !r.length && !n && !s
         ? (l = t)
         : ((l = {}),
           r.length && r.forEach((u) => Xs(l, u, i, !0)),
           Xs(l, t, i)),
      pe(t) && o.set(t, l),
      l
   )
}
function Xs(e, t, n, s = !1) {
   const { mixins: r, extends: o } = t
   o && Xs(e, o, n, !0), r && r.forEach((i) => Xs(e, i, n, !0))
   for (const i in t)
      if (!(s && i === 'expose')) {
         const a = Ad[i] || (n && n[i])
         e[i] = a ? a(e[i], t[i]) : t[i]
      }
   return e
}
const Ad = {
   data: Ji,
   props: Xi,
   emits: Xi,
   methods: es,
   computed: es,
   beforeCreate: Ce,
   created: Ce,
   beforeMount: Ce,
   mounted: Ce,
   beforeUpdate: Ce,
   updated: Ce,
   beforeDestroy: Ce,
   beforeUnmount: Ce,
   destroyed: Ce,
   unmounted: Ce,
   activated: Ce,
   deactivated: Ce,
   errorCaptured: Ce,
   serverPrefetch: Ce,
   components: es,
   directives: es,
   watch: Od,
   provide: Ji,
   inject: Sd,
}
function Ji(e, t) {
   return t
      ? e
         ? function () {
              return Ae(
                 z(e) ? e.call(this, this) : e,
                 z(t) ? t.call(this, this) : t
              )
           }
         : t
      : e
}
function Sd(e, t) {
   return es(wo(e), wo(t))
}
function wo(e) {
   if (j(e)) {
      const t = {}
      for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
      return t
   }
   return e
}
function Ce(e, t) {
   return e ? [...new Set([].concat(e, t))] : t
}
function es(e, t) {
   return e ? Ae(Object.create(null), e, t) : t
}
function Xi(e, t) {
   return e
      ? j(e) && j(t)
         ? [...new Set([...e, ...t])]
         : Ae(Object.create(null), Yi(e), Yi(t ?? {}))
      : t
}
function Od(e, t) {
   if (!e) return t
   if (!t) return e
   const n = Ae(Object.create(null), e)
   for (const s in t) n[s] = Ce(e[s], t[s])
   return n
}
function fc() {
   return {
      app: null,
      config: {
         isNativeTag: lf,
         performance: !1,
         globalProperties: {},
         optionMergeStrategies: {},
         errorHandler: void 0,
         warnHandler: void 0,
         compilerOptions: {},
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap(),
   }
}
let Cd = 0
function Nd(e, t) {
   return function (s, r = null) {
      z(s) || (s = Ae({}, s)), r != null && !pe(r) && (r = null)
      const o = fc(),
         i = new WeakSet()
      let a = !1
      const l = (o.app = {
         _uid: Cd++,
         _component: s,
         _props: r,
         _container: null,
         _context: o,
         _instance: null,
         version: th,
         get config() {
            return o.config
         },
         set config(u) {},
         use(u, ...c) {
            return (
               i.has(u) ||
                  (u && z(u.install)
                     ? (i.add(u), u.install(l, ...c))
                     : z(u) && (i.add(u), u(l, ...c))),
               l
            )
         },
         mixin(u) {
            return o.mixins.includes(u) || o.mixins.push(u), l
         },
         component(u, c) {
            return c ? ((o.components[u] = c), l) : o.components[u]
         },
         directive(u, c) {
            return c ? ((o.directives[u] = c), l) : o.directives[u]
         },
         mount(u, c, d) {
            if (!a) {
               const p = oe(s, r)
               return (
                  (p.appContext = o),
                  c && t ? t(p, u) : e(p, u, d),
                  (a = !0),
                  (l._container = u),
                  (u.__vue_app__ = l),
                  br(p.component) || p.component.proxy
               )
            }
         },
         unmount() {
            a && (e(null, l._container), delete l._container.__vue_app__)
         },
         provide(u, c) {
            return (o.provides[u] = c), l
         },
         runWithContext(u) {
            Qs = l
            try {
               return u()
            } finally {
               Qs = null
            }
         },
      })
      return l
   }
}
let Qs = null
function Ws(e, t) {
   if (Te) {
      let n = Te.provides
      const s = Te.parent && Te.parent.provides
      s === n && (n = Te.provides = Object.create(s)), (n[e] = t)
   }
}
function Tt(e, t, n = !1) {
   const s = Te || ze
   if (s || Qs) {
      const r = s
         ? s.parent == null
            ? s.vnode.appContext && s.vnode.appContext.provides
            : s.parent.provides
         : Qs._context.provides
      if (r && e in r) return r[e]
      if (arguments.length > 1) return n && z(t) ? t.call(s && s.proxy) : t
   }
}
function xd(e, t, n, s = !1) {
   const r = {},
      o = {}
   Ys(o, vr, 1), (e.propsDefaults = Object.create(null)), dc(e, t, r, o)
   for (const i in e.propsOptions[0]) i in r || (r[i] = void 0)
   n ? (e.props = s ? r : jl(r)) : e.type.props ? (e.props = r) : (e.props = o),
      (e.attrs = o)
}
function Rd(e, t, n, s) {
   const {
         props: r,
         attrs: o,
         vnode: { patchFlag: i },
      } = e,
      a = se(r),
      [l] = e.propsOptions
   let u = !1
   if ((s || i > 0) && !(i & 16)) {
      if (i & 8) {
         const c = e.vnode.dynamicProps
         for (let d = 0; d < c.length; d++) {
            let p = c[d]
            if (hr(e.emitsOptions, p)) continue
            const _ = t[p]
            if (l)
               if (Z(o, p)) _ !== o[p] && ((o[p] = _), (u = !0))
               else {
                  const g = mt(p)
                  r[g] = To(l, a, g, _, e, !1)
               }
            else _ !== o[p] && ((o[p] = _), (u = !0))
         }
      }
   } else {
      dc(e, t, r, o) && (u = !0)
      let c
      for (const d in a)
         (!t || (!Z(t, d) && ((c = Fn(d)) === d || !Z(t, c)))) &&
            (l
               ? n &&
                 (n[d] !== void 0 || n[c] !== void 0) &&
                 (r[d] = To(l, a, d, void 0, e, !0))
               : delete r[d])
      if (o !== a)
         for (const d in o) (!t || !Z(t, d)) && (delete o[d], (u = !0))
   }
   u && wt(e, 'set', '$attrs')
}
function dc(e, t, n, s) {
   const [r, o] = e.propsOptions
   let i = !1,
      a
   if (t)
      for (let l in t) {
         if (Is(l)) continue
         const u = t[l]
         let c
         r && Z(r, (c = mt(l)))
            ? !o || !o.includes(c)
               ? (n[c] = u)
               : ((a || (a = {}))[c] = u)
            : hr(e.emitsOptions, l) ||
              ((!(l in s) || u !== s[l]) && ((s[l] = u), (i = !0)))
      }
   if (o) {
      const l = se(n),
         u = a || he
      for (let c = 0; c < o.length; c++) {
         const d = o[c]
         n[d] = To(r, l, d, u[d], e, !Z(u, d))
      }
   }
   return i
}
function To(e, t, n, s, r, o) {
   const i = e[n]
   if (i != null) {
      const a = Z(i, 'default')
      if (a && s === void 0) {
         const l = i.default
         if (i.type !== Function && !i.skipFactory && z(l)) {
            const { propsDefaults: u } = r
            n in u ? (s = u[n]) : (Nn(r), (s = u[n] = l.call(null, t)), nn())
         } else s = l
      }
      i[0] &&
         (o && !a ? (s = !1) : i[1] && (s === '' || s === Fn(n)) && (s = !0))
   }
   return s
}
function hc(e, t, n = !1) {
   const s = t.propsCache,
      r = s.get(e)
   if (r) return r
   const o = e.props,
      i = {},
      a = []
   let l = !1
   if (!z(e)) {
      const c = (d) => {
         l = !0
         const [p, _] = hc(d, t, !0)
         Ae(i, p), _ && a.push(..._)
      }
      !n && t.mixins.length && t.mixins.forEach(c),
         e.extends && c(e.extends),
         e.mixins && e.mixins.forEach(c)
   }
   if (!o && !l) return pe(e) && s.set(e, yn), yn
   if (j(o))
      for (let c = 0; c < o.length; c++) {
         const d = mt(o[c])
         Qi(d) && (i[d] = he)
      }
   else if (o)
      for (const c in o) {
         const d = mt(c)
         if (Qi(d)) {
            const p = o[c],
               _ = (i[d] = j(p) || z(p) ? { type: p } : Ae({}, p))
            if (_) {
               const g = ta(Boolean, _.type),
                  E = ta(String, _.type)
               ;(_[0] = g > -1),
                  (_[1] = E < 0 || g < E),
                  (g > -1 || Z(_, 'default')) && a.push(d)
            }
         }
      }
   const u = [i, a]
   return pe(e) && s.set(e, u), u
}
function Qi(e) {
   return e[0] !== '$'
}
function Zi(e) {
   const t = e && e.toString().match(/^\s*(function|class) (\w+)/)
   return t ? t[2] : e === null ? 'null' : ''
}
function ea(e, t) {
   return Zi(e) === Zi(t)
}
function ta(e, t) {
   return j(t) ? t.findIndex((n) => ea(n, e)) : z(t) && ea(t, e) ? 0 : -1
}
const pc = (e) => e[0] === '_' || e === '$stable',
   si = (e) => (j(e) ? e.map(ut) : [ut(e)]),
   Pd = (e, t, n) => {
      if (t._n) return t
      const s = Gt((...r) => si(t(...r)), n)
      return (s._c = !1), s
   },
   mc = (e, t, n) => {
      const s = e._ctx
      for (const r in e) {
         if (pc(r)) continue
         const o = e[r]
         if (z(o)) t[r] = Pd(r, o, s)
         else if (o != null) {
            const i = si(o)
            t[r] = () => i
         }
      }
   },
   _c = (e, t) => {
      const n = si(t)
      e.slots.default = () => n
   },
   kd = (e, t) => {
      if (e.vnode.shapeFlag & 32) {
         const n = t._
         n ? ((e.slots = se(t)), Ys(t, '_', n)) : mc(t, (e.slots = {}))
      } else (e.slots = {}), t && _c(e, t)
      Ys(e.slots, vr, 1)
   },
   Dd = (e, t, n) => {
      const { vnode: s, slots: r } = e
      let o = !0,
         i = he
      if (s.shapeFlag & 32) {
         const a = t._
         a
            ? n && a === 1
               ? (o = !1)
               : (Ae(r, t), !n && a === 1 && delete r._)
            : ((o = !t.$stable), mc(t, r)),
            (i = t)
      } else t && (_c(e, t), (i = { default: 1 }))
      if (o) for (const a in r) !pc(a) && i[a] == null && delete r[a]
   }
function Ao(e, t, n, s, r = !1) {
   if (j(e)) {
      e.forEach((p, _) => Ao(p, t && (j(t) ? t[_] : t), n, s, r))
      return
   }
   if (Fs(s) && !r) return
   const o = s.shapeFlag & 4 ? br(s.component) || s.component.proxy : s.el,
      i = r ? null : o,
      { i: a, r: l } = e,
      u = t && t.r,
      c = a.refs === he ? (a.refs = {}) : a.refs,
      d = a.setupState
   if (
      (u != null &&
         u !== l &&
         (ye(u)
            ? ((c[u] = null), Z(d, u) && (d[u] = null))
            : Oe(u) && (u.value = null)),
      z(l))
   )
      Mt(l, a, 12, [i, c])
   else {
      const p = ye(l),
         _ = Oe(l)
      if (p || _) {
         const g = () => {
            if (e.f) {
               const E = p ? (Z(d, l) ? d[l] : c[l]) : l.value
               r
                  ? j(E) && Uo(E, o)
                  : j(E)
                  ? E.includes(o) || E.push(o)
                  : p
                  ? ((c[l] = [o]), Z(d, l) && (d[l] = c[l]))
                  : ((l.value = [o]), e.k && (c[e.k] = l.value))
            } else
               p
                  ? ((c[l] = i), Z(d, l) && (d[l] = i))
                  : _ && ((l.value = i), e.k && (c[e.k] = i))
         }
         i ? ((g.id = -1), De(g, n)) : g()
      }
   }
}
const De = od
function $d(e) {
   return Ld(e)
}
function Ld(e, t) {
   const n = po()
   n.__VUE__ = !0
   const {
         insert: s,
         remove: r,
         patchProp: o,
         createElement: i,
         createText: a,
         createComment: l,
         setText: u,
         setElementText: c,
         parentNode: d,
         nextSibling: p,
         setScopeId: _ = rt,
         insertStaticContent: g,
      } = e,
      E = (
         f,
         h,
         m,
         v = null,
         w = null,
         T = null,
         L = !1,
         x = null,
         R = !!h.dynamicChildren
      ) => {
         if (f === h) return
         f && !Yn(f, h) && ((v = b(f)), _e(f, w, T, !0), (f = null)),
            h.patchFlag === -2 && ((R = !1), (h.dynamicChildren = null))
         const { type: S, ref: W, shapeFlag: I } = h
         switch (S) {
            case Er:
               O(f, h, m, v)
               break
            case on:
               N(f, h, m, v)
               break
            case Wr:
               f == null && P(h, m, v, L)
               break
            case be:
               ve(f, h, m, v, w, T, L, x, R)
               break
            default:
               I & 1
                  ? U(f, h, m, v, w, T, L, x, R)
                  : I & 6
                  ? ue(f, h, m, v, w, T, L, x, R)
                  : (I & 64 || I & 128) &&
                    S.process(f, h, m, v, w, T, L, x, R, k)
         }
         W != null && w && Ao(W, f && f.ref, T, h || f, !h)
      },
      O = (f, h, m, v) => {
         if (f == null) s((h.el = a(h.children)), m, v)
         else {
            const w = (h.el = f.el)
            h.children !== f.children && u(w, h.children)
         }
      },
      N = (f, h, m, v) => {
         f == null ? s((h.el = l(h.children || '')), m, v) : (h.el = f.el)
      },
      P = (f, h, m, v) => {
         ;[f.el, f.anchor] = g(f.children, h, m, v, f.el, f.anchor)
      },
      M = ({ el: f, anchor: h }, m, v) => {
         let w
         for (; f && f !== h; ) (w = p(f)), s(f, m, v), (f = w)
         s(h, m, v)
      },
      C = ({ el: f, anchor: h }) => {
         let m
         for (; f && f !== h; ) (m = p(f)), r(f), (f = m)
         r(h)
      },
      U = (f, h, m, v, w, T, L, x, R) => {
         ;(L = L || h.type === 'svg'),
            f == null ? K(h, m, v, w, T, L, x, R) : fe(f, h, w, T, L, x, R)
      },
      K = (f, h, m, v, w, T, L, x) => {
         let R, S
         const { type: W, props: I, shapeFlag: F, transition: B, dirs: Y } = f
         if (
            ((R = f.el = i(f.type, T, I && I.is, I)),
            F & 8
               ? c(R, f.children)
               : F & 16 &&
                 ce(
                    f.children,
                    R,
                    null,
                    v,
                    w,
                    T && W !== 'foreignObject',
                    L,
                    x
                 ),
            Y && Kt(f, null, v, 'created'),
            Q(R, f, f.scopeId, L, v),
            I)
         ) {
            for (const te in I)
               te !== 'value' &&
                  !Is(te) &&
                  o(R, te, null, I[te], T, f.children, v, w, me)
            'value' in I && o(R, 'value', null, I.value),
               (S = I.onVnodeBeforeMount) && ct(S, v, f)
         }
         Y && Kt(f, null, v, 'beforeMount')
         const ie = Id(w, B)
         ie && B.beforeEnter(R),
            s(R, h, m),
            ((S = I && I.onVnodeMounted) || ie || Y) &&
               De(() => {
                  S && ct(S, v, f),
                     ie && B.enter(R),
                     Y && Kt(f, null, v, 'mounted')
               }, w)
      },
      Q = (f, h, m, v, w) => {
         if ((m && _(f, m), v)) for (let T = 0; T < v.length; T++) _(f, v[T])
         if (w) {
            let T = w.subTree
            if (h === T) {
               const L = w.vnode
               Q(f, L, L.scopeId, L.slotScopeIds, w.parent)
            }
         }
      },
      ce = (f, h, m, v, w, T, L, x, R = 0) => {
         for (let S = R; S < f.length; S++) {
            const W = (f[S] = x ? $t(f[S]) : ut(f[S]))
            E(null, W, h, m, v, w, T, L, x)
         }
      },
      fe = (f, h, m, v, w, T, L) => {
         const x = (h.el = f.el)
         let { patchFlag: R, dynamicChildren: S, dirs: W } = h
         R |= f.patchFlag & 16
         const I = f.props || he,
            F = h.props || he
         let B
         m && zt(m, !1),
            (B = F.onVnodeBeforeUpdate) && ct(B, m, h, f),
            W && Kt(h, f, m, 'beforeUpdate'),
            m && zt(m, !0)
         const Y = w && h.type !== 'foreignObject'
         if (
            (S
               ? re(f.dynamicChildren, S, x, m, v, Y, T)
               : L || G(f, h, x, null, m, v, Y, T, !1),
            R > 0)
         ) {
            if (R & 16) de(x, h, I, F, m, v, w)
            else if (
               (R & 2 && I.class !== F.class && o(x, 'class', null, F.class, w),
               R & 4 && o(x, 'style', I.style, F.style, w),
               R & 8)
            ) {
               const ie = h.dynamicProps
               for (let te = 0; te < ie.length; te++) {
                  const ge = ie[te],
                     Ze = I[ge],
                     fn = F[ge]
                  ;(fn !== Ze || ge === 'value') &&
                     o(x, ge, Ze, fn, w, f.children, m, v, me)
               }
            }
            R & 1 && f.children !== h.children && c(x, h.children)
         } else !L && S == null && de(x, h, I, F, m, v, w)
         ;((B = F.onVnodeUpdated) || W) &&
            De(() => {
               B && ct(B, m, h, f), W && Kt(h, f, m, 'updated')
            }, v)
      },
      re = (f, h, m, v, w, T, L) => {
         for (let x = 0; x < h.length; x++) {
            const R = f[x],
               S = h[x],
               W =
                  R.el && (R.type === be || !Yn(R, S) || R.shapeFlag & 70)
                     ? d(R.el)
                     : m
            E(R, S, W, null, v, w, T, L, !0)
         }
      },
      de = (f, h, m, v, w, T, L) => {
         if (m !== v) {
            if (m !== he)
               for (const x in m)
                  !Is(x) &&
                     !(x in v) &&
                     o(f, x, m[x], null, L, h.children, w, T, me)
            for (const x in v) {
               if (Is(x)) continue
               const R = v[x],
                  S = m[x]
               R !== S &&
                  x !== 'value' &&
                  o(f, x, S, R, L, h.children, w, T, me)
            }
            'value' in v && o(f, 'value', m.value, v.value)
         }
      },
      ve = (f, h, m, v, w, T, L, x, R) => {
         const S = (h.el = f ? f.el : a('')),
            W = (h.anchor = f ? f.anchor : a(''))
         let { patchFlag: I, dynamicChildren: F, slotScopeIds: B } = h
         B && (x = x ? x.concat(B) : B),
            f == null
               ? (s(S, m, v), s(W, m, v), ce(h.children, m, W, w, T, L, x, R))
               : I > 0 && I & 64 && F && f.dynamicChildren
               ? (re(f.dynamicChildren, F, m, w, T, L, x),
                 (h.key != null || (w && h === w.subTree)) && gc(f, h, !0))
               : G(f, h, m, W, w, T, L, x, R)
      },
      ue = (f, h, m, v, w, T, L, x, R) => {
         ;(h.slotScopeIds = x),
            f == null
               ? h.shapeFlag & 512
                  ? w.ctx.activate(h, m, v, L, R)
                  : Me(h, m, v, w, T, L, R)
               : Pe(f, h, R)
      },
      Me = (f, h, m, v, w, T, L) => {
         const x = (f.component = zd(f, v, w))
         if ((ic(f) && (x.ctx.renderer = k), qd(x), x.asyncDep)) {
            if ((w && w.registerDep(x, ee), !f.el)) {
               const R = (x.subTree = oe(on))
               N(null, R, h, m)
            }
            return
         }
         ee(x, f, h, m, w, T, L)
      },
      Pe = (f, h, m) => {
         const v = (h.component = f.component)
         if (nd(f, h, m))
            if (v.asyncDep && !v.asyncResolved) {
               q(v, h, m)
               return
            } else (v.next = h), Jf(v.update), v.update()
         else (h.el = f.el), (v.vnode = h)
      },
      ee = (f, h, m, v, w, T, L) => {
         const x = () => {
               if (f.isMounted) {
                  let { next: W, bu: I, u: F, parent: B, vnode: Y } = f,
                     ie = W,
                     te
                  zt(f, !1),
                     W ? ((W.el = Y.el), q(f, W, L)) : (W = Y),
                     I && Ms(I),
                     (te = W.props && W.props.onVnodeBeforeUpdate) &&
                        ct(te, B, W, Y),
                     zt(f, !0)
                  const ge = Hr(f),
                     Ze = f.subTree
                  ;(f.subTree = ge),
                     E(Ze, ge, d(Ze.el), b(Ze), f, w, T),
                     (W.el = ge.el),
                     ie === null && sd(f, ge.el),
                     F && De(F, w),
                     (te = W.props && W.props.onVnodeUpdated) &&
                        De(() => ct(te, B, W, Y), w)
               } else {
                  let W
                  const { el: I, props: F } = h,
                     { bm: B, m: Y, parent: ie } = f,
                     te = Fs(h)
                  if (
                     (zt(f, !1),
                     B && Ms(B),
                     !te && (W = F && F.onVnodeBeforeMount) && ct(W, ie, h),
                     zt(f, !0),
                     I && J)
                  ) {
                     const ge = () => {
                        ;(f.subTree = Hr(f)), J(I, f.subTree, f, w, null)
                     }
                     te
                        ? h.type
                             .__asyncLoader()
                             .then(() => !f.isUnmounted && ge())
                        : ge()
                  } else {
                     const ge = (f.subTree = Hr(f))
                     E(null, ge, m, v, f, w, T), (h.el = ge.el)
                  }
                  if ((Y && De(Y, w), !te && (W = F && F.onVnodeMounted))) {
                     const ge = h
                     De(() => ct(W, ie, ge), w)
                  }
                  ;(h.shapeFlag & 256 ||
                     (ie && Fs(ie.vnode) && ie.vnode.shapeFlag & 256)) &&
                     f.a &&
                     De(f.a, w),
                     (f.isMounted = !0),
                     (h = m = v = null)
               }
            },
            R = (f.effect = new Go(x, () => ti(S), f.scope)),
            S = (f.update = () => R.run())
         ;(S.id = f.uid), zt(f, !0), S()
      },
      q = (f, h, m) => {
         h.component = f
         const v = f.vnode.props
         ;(f.vnode = h),
            (f.next = null),
            Rd(f, h.props, v, m),
            Dd(f, h.children, m),
            Wn(),
            Ki(),
            Vn()
      },
      G = (f, h, m, v, w, T, L, x, R = !1) => {
         const S = f && f.children,
            W = f ? f.shapeFlag : 0,
            I = h.children,
            { patchFlag: F, shapeFlag: B } = h
         if (F > 0) {
            if (F & 128) {
               He(S, I, m, v, w, T, L, x, R)
               return
            } else if (F & 256) {
               we(S, I, m, v, w, T, L, x, R)
               return
            }
         }
         B & 8
            ? (W & 16 && me(S, w, T), I !== S && c(m, I))
            : W & 16
            ? B & 16
               ? He(S, I, m, v, w, T, L, x, R)
               : me(S, w, T, !0)
            : (W & 8 && c(m, ''), B & 16 && ce(I, m, v, w, T, L, x, R))
      },
      we = (f, h, m, v, w, T, L, x, R) => {
         ;(f = f || yn), (h = h || yn)
         const S = f.length,
            W = h.length,
            I = Math.min(S, W)
         let F
         for (F = 0; F < I; F++) {
            const B = (h[F] = R ? $t(h[F]) : ut(h[F]))
            E(f[F], B, m, null, w, T, L, x, R)
         }
         S > W ? me(f, w, T, !0, !1, I) : ce(h, m, v, w, T, L, x, R, I)
      },
      He = (f, h, m, v, w, T, L, x, R) => {
         let S = 0
         const W = h.length
         let I = f.length - 1,
            F = W - 1
         for (; S <= I && S <= F; ) {
            const B = f[S],
               Y = (h[S] = R ? $t(h[S]) : ut(h[S]))
            if (Yn(B, Y)) E(B, Y, m, null, w, T, L, x, R)
            else break
            S++
         }
         for (; S <= I && S <= F; ) {
            const B = f[I],
               Y = (h[F] = R ? $t(h[F]) : ut(h[F]))
            if (Yn(B, Y)) E(B, Y, m, null, w, T, L, x, R)
            else break
            I--, F--
         }
         if (S > I) {
            if (S <= F) {
               const B = F + 1,
                  Y = B < W ? h[B].el : v
               for (; S <= F; )
                  E(
                     null,
                     (h[S] = R ? $t(h[S]) : ut(h[S])),
                     m,
                     Y,
                     w,
                     T,
                     L,
                     x,
                     R
                  ),
                     S++
            }
         } else if (S > F) for (; S <= I; ) _e(f[S], w, T, !0), S++
         else {
            const B = S,
               Y = S,
               ie = new Map()
            for (S = Y; S <= F; S++) {
               const Ve = (h[S] = R ? $t(h[S]) : ut(h[S]))
               Ve.key != null && ie.set(Ve.key, S)
            }
            let te,
               ge = 0
            const Ze = F - Y + 1
            let fn = !1,
               $i = 0
            const qn = new Array(Ze)
            for (S = 0; S < Ze; S++) qn[S] = 0
            for (S = B; S <= I; S++) {
               const Ve = f[S]
               if (ge >= Ze) {
                  _e(Ve, w, T, !0)
                  continue
               }
               let lt
               if (Ve.key != null) lt = ie.get(Ve.key)
               else
                  for (te = Y; te <= F; te++)
                     if (qn[te - Y] === 0 && Yn(Ve, h[te])) {
                        lt = te
                        break
                     }
               lt === void 0
                  ? _e(Ve, w, T, !0)
                  : ((qn[lt - Y] = S + 1),
                    lt >= $i ? ($i = lt) : (fn = !0),
                    E(Ve, h[lt], m, null, w, T, L, x, R),
                    ge++)
            }
            const Li = fn ? Md(qn) : yn
            for (te = Li.length - 1, S = Ze - 1; S >= 0; S--) {
               const Ve = Y + S,
                  lt = h[Ve],
                  Ii = Ve + 1 < W ? h[Ve + 1].el : v
               qn[S] === 0
                  ? E(null, lt, m, Ii, w, T, L, x, R)
                  : fn && (te < 0 || S !== Li[te] ? ke(lt, m, Ii, 2) : te--)
            }
         }
      },
      ke = (f, h, m, v, w = null) => {
         const { el: T, type: L, transition: x, children: R, shapeFlag: S } = f
         if (S & 6) {
            ke(f.component.subTree, h, m, v)
            return
         }
         if (S & 128) {
            f.suspense.move(h, m, v)
            return
         }
         if (S & 64) {
            L.move(f, h, m, k)
            return
         }
         if (L === be) {
            s(T, h, m)
            for (let I = 0; I < R.length; I++) ke(R[I], h, m, v)
            s(f.anchor, h, m)
            return
         }
         if (L === Wr) {
            M(f, h, m)
            return
         }
         if (v !== 2 && S & 1 && x)
            if (v === 0) x.beforeEnter(T), s(T, h, m), De(() => x.enter(T), w)
            else {
               const { leave: I, delayLeave: F, afterLeave: B } = x,
                  Y = () => s(T, h, m),
                  ie = () => {
                     I(T, () => {
                        Y(), B && B()
                     })
                  }
               F ? F(T, Y, ie) : ie()
            }
         else s(T, h, m)
      },
      _e = (f, h, m, v = !1, w = !1) => {
         const {
            type: T,
            props: L,
            ref: x,
            children: R,
            dynamicChildren: S,
            shapeFlag: W,
            patchFlag: I,
            dirs: F,
         } = f
         if ((x != null && Ao(x, null, m, f, !0), W & 256)) {
            h.ctx.deactivate(f)
            return
         }
         const B = W & 1 && F,
            Y = !Fs(f)
         let ie
         if ((Y && (ie = L && L.onVnodeBeforeUnmount) && ct(ie, h, f), W & 6))
            We(f.component, m, v)
         else {
            if (W & 128) {
               f.suspense.unmount(m, v)
               return
            }
            B && Kt(f, null, h, 'beforeUnmount'),
               W & 64
                  ? f.type.remove(f, h, m, w, k, v)
                  : S && (T !== be || (I > 0 && I & 64))
                  ? me(S, h, m, !1, !0)
                  : ((T === be && I & 384) || (!w && W & 16)) && me(R, h, m),
               v && Qe(f)
         }
         ;((Y && (ie = L && L.onVnodeUnmounted)) || B) &&
            De(() => {
               ie && ct(ie, h, f), B && Kt(f, null, h, 'unmounted')
            }, m)
      },
      Qe = (f) => {
         const { type: h, el: m, anchor: v, transition: w } = f
         if (h === be) {
            Fe(m, v)
            return
         }
         if (h === Wr) {
            C(f)
            return
         }
         const T = () => {
            r(m), w && !w.persisted && w.afterLeave && w.afterLeave()
         }
         if (f.shapeFlag & 1 && w && !w.persisted) {
            const { leave: L, delayLeave: x } = w,
               R = () => L(m, T)
            x ? x(f.el, T, R) : R()
         } else T()
      },
      Fe = (f, h) => {
         let m
         for (; f !== h; ) (m = p(f)), r(f), (f = m)
         r(h)
      },
      We = (f, h, m) => {
         const { bum: v, scope: w, update: T, subTree: L, um: x } = f
         v && Ms(v),
            w.stop(),
            T && ((T.active = !1), _e(L, f, h, m)),
            x && De(x, h),
            De(() => {
               f.isUnmounted = !0
            }, h),
            h &&
               h.pendingBranch &&
               !h.isUnmounted &&
               f.asyncDep &&
               !f.asyncResolved &&
               f.suspenseId === h.pendingId &&
               (h.deps--, h.deps === 0 && h.resolve())
      },
      me = (f, h, m, v = !1, w = !1, T = 0) => {
         for (let L = T; L < f.length; L++) _e(f[L], h, m, v, w)
      },
      b = (f) =>
         f.shapeFlag & 6
            ? b(f.component.subTree)
            : f.shapeFlag & 128
            ? f.suspense.next()
            : p(f.anchor || f.el),
      $ = (f, h, m) => {
         f == null
            ? h._vnode && _e(h._vnode, null, null, !0)
            : E(h._vnode || null, f, h, null, null, null, m),
            Ki(),
            ec(),
            (h._vnode = f)
      },
      k = {
         p: E,
         um: _e,
         m: ke,
         r: Qe,
         mt: Me,
         mc: ce,
         pc: G,
         pbc: re,
         n: b,
         o: e,
      }
   let H, J
   return t && ([H, J] = t(k)), { render: $, hydrate: H, createApp: Nd($, H) }
}
function zt({ effect: e, update: t }, n) {
   e.allowRecurse = t.allowRecurse = n
}
function Id(e, t) {
   return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function gc(e, t, n = !1) {
   const s = e.children,
      r = t.children
   if (j(s) && j(r))
      for (let o = 0; o < s.length; o++) {
         const i = s[o]
         let a = r[o]
         a.shapeFlag & 1 &&
            !a.dynamicChildren &&
            ((a.patchFlag <= 0 || a.patchFlag === 32) &&
               ((a = r[o] = $t(r[o])), (a.el = i.el)),
            n || gc(i, a)),
            a.type === Er && (a.el = i.el)
      }
}
function Md(e) {
   const t = e.slice(),
      n = [0]
   let s, r, o, i, a
   const l = e.length
   for (s = 0; s < l; s++) {
      const u = e[s]
      if (u !== 0) {
         if (((r = n[n.length - 1]), e[r] < u)) {
            ;(t[s] = r), n.push(s)
            continue
         }
         for (o = 0, i = n.length - 1; o < i; )
            (a = (o + i) >> 1), e[n[a]] < u ? (o = a + 1) : (i = a)
         u < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s))
      }
   }
   for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i])
   return n
}
const Hd = (e) => e.__isTeleport,
   be = Symbol.for('v-fgt'),
   Er = Symbol.for('v-txt'),
   on = Symbol.for('v-cmt'),
   Wr = Symbol.for('v-stc'),
   ns = []
let st = null
function ne(e = !1) {
   ns.push((st = e ? null : []))
}
function Fd() {
   ns.pop(), (st = ns[ns.length - 1] || null)
}
let us = 1
function na(e) {
   us += e
}
function Ec(e) {
   return (
      (e.dynamicChildren = us > 0 ? st || yn : null),
      Fd(),
      us > 0 && st && st.push(e),
      e
   )
}
function le(e, t, n, s, r, o) {
   return Ec(D(e, t, n, s, r, o, !0))
}
function ri(e, t, n, s, r) {
   return Ec(oe(e, t, n, s, r, !0))
}
function So(e) {
   return e ? e.__v_isVNode === !0 : !1
}
function Yn(e, t) {
   return e.type === t.type && e.key === t.key
}
const vr = '__vInternal',
   vc = ({ key: e }) => e ?? null,
   Vs = ({ ref: e, ref_key: t, ref_for: n }) => (
      typeof e == 'number' && (e = '' + e),
      e != null
         ? ye(e) || Oe(e) || z(e)
            ? { i: ze, r: e, k: t, f: !!n }
            : e
         : null
   )
function D(
   e,
   t = null,
   n = null,
   s = 0,
   r = null,
   o = e === be ? 0 : 1,
   i = !1,
   a = !1
) {
   const l = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e,
      props: t,
      key: t && vc(t),
      ref: t && Vs(t),
      scopeId: pr,
      slotScopeIds: null,
      children: n,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: o,
      patchFlag: s,
      dynamicProps: r,
      dynamicChildren: null,
      appContext: null,
      ctx: ze,
   }
   return (
      a
         ? (oi(l, n), o & 128 && e.normalize(l))
         : n && (l.shapeFlag |= ye(n) ? 8 : 16),
      us > 0 &&
         !i &&
         st &&
         (l.patchFlag > 0 || o & 6) &&
         l.patchFlag !== 32 &&
         st.push(l),
      l
   )
}
const oe = Wd
function Wd(e, t = null, n = null, s = 0, r = null, o = !1) {
   if (((!e || e === vd) && (e = on), So(e))) {
      const a = Cn(e, t, !0)
      return (
         n && oi(a, n),
         us > 0 &&
            !o &&
            st &&
            (a.shapeFlag & 6 ? (st[st.indexOf(e)] = a) : st.push(a)),
         (a.patchFlag |= -2),
         a
      )
   }
   if ((Qd(e) && (e = e.__vccOpts), t)) {
      t = Vd(t)
      let { class: a, style: l } = t
      a && !ye(a) && (t.class = qo(a)),
         pe(l) && (Kl(l) && !j(l) && (l = Ae({}, l)), (t.style = zo(l)))
   }
   const i = ye(e) ? 1 : rd(e) ? 128 : Hd(e) ? 64 : pe(e) ? 4 : z(e) ? 2 : 0
   return D(e, t, n, s, r, i, o, !0)
}
function Vd(e) {
   return e ? (Kl(e) || vr in e ? Ae({}, e) : e) : null
}
function Cn(e, t, n = !1) {
   const { props: s, ref: r, patchFlag: o, children: i } = e,
      a = t ? jd(s || {}, t) : s
   return {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: a,
      key: a && vc(a),
      ref:
         t && t.ref
            ? n && r
               ? j(r)
                  ? r.concat(Vs(t))
                  : [r, Vs(t)]
               : Vs(t)
            : r,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: i,
      target: e.target,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== be ? (o === -1 ? 16 : o | 16) : o,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: e.transition,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Cn(e.ssContent),
      ssFallback: e.ssFallback && Cn(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
   }
}
function Xt(e = ' ', t = 0) {
   return oe(Er, null, e, t)
}
function Bd(e = '', t = !1) {
   return t ? (ne(), ri(on, null, e)) : oe(on, null, e)
}
function ut(e) {
   return e == null || typeof e == 'boolean'
      ? oe(on)
      : j(e)
      ? oe(be, null, e.slice())
      : typeof e == 'object'
      ? $t(e)
      : oe(Er, null, String(e))
}
function $t(e) {
   return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Cn(e)
}
function oi(e, t) {
   let n = 0
   const { shapeFlag: s } = e
   if (t == null) t = null
   else if (j(t)) n = 16
   else if (typeof t == 'object')
      if (s & 65) {
         const r = t.default
         r && (r._c && (r._d = !1), oi(e, r()), r._c && (r._d = !0))
         return
      } else {
         n = 32
         const r = t._
         !r && !(vr in t)
            ? (t._ctx = ze)
            : r === 3 &&
              ze &&
              (ze.slots._ === 1
                 ? (t._ = 1)
                 : ((t._ = 2), (e.patchFlag |= 1024)))
      }
   else
      z(t)
         ? ((t = { default: t, _ctx: ze }), (n = 32))
         : ((t = String(t)), s & 64 ? ((n = 16), (t = [Xt(t)])) : (n = 8))
   ;(e.children = t), (e.shapeFlag |= n)
}
function jd(...e) {
   const t = {}
   for (let n = 0; n < e.length; n++) {
      const s = e[n]
      for (const r in s)
         if (r === 'class')
            t.class !== s.class && (t.class = qo([t.class, s.class]))
         else if (r === 'style') t.style = zo([t.style, s.style])
         else if (or(r)) {
            const o = t[r],
               i = s[r]
            i &&
               o !== i &&
               !(j(o) && o.includes(i)) &&
               (t[r] = o ? [].concat(o, i) : i)
         } else r !== '' && (t[r] = s[r])
   }
   return t
}
function ct(e, t, n, s = null) {
   ot(e, t, 7, [n, s])
}
const Ud = fc()
let Kd = 0
function zd(e, t, n) {
   const s = e.type,
      r = (t ? t.appContext : e.appContext) || Ud,
      o = {
         uid: Kd++,
         vnode: e,
         type: s,
         parent: t,
         appContext: r,
         root: null,
         next: null,
         subTree: null,
         effect: null,
         update: null,
         scope: new bf(!0),
         render: null,
         proxy: null,
         exposed: null,
         exposeProxy: null,
         withProxy: null,
         provides: t ? t.provides : Object.create(r.provides),
         accessCache: null,
         renderCache: [],
         components: null,
         directives: null,
         propsOptions: hc(s, r),
         emitsOptions: nc(s, r),
         emit: null,
         emitted: null,
         propsDefaults: he,
         inheritAttrs: s.inheritAttrs,
         ctx: he,
         data: he,
         props: he,
         attrs: he,
         slots: he,
         refs: he,
         setupState: he,
         setupContext: null,
         attrsProxy: null,
         slotsProxy: null,
         suspense: n,
         suspenseId: n ? n.pendingId : 0,
         asyncDep: null,
         asyncResolved: !1,
         isMounted: !1,
         isUnmounted: !1,
         isDeactivated: !1,
         bc: null,
         c: null,
         bm: null,
         m: null,
         bu: null,
         u: null,
         um: null,
         bum: null,
         da: null,
         a: null,
         rtg: null,
         rtc: null,
         ec: null,
         sp: null,
      }
   return (
      (o.ctx = { _: o }),
      (o.root = t ? t.root : o),
      (o.emit = Zf.bind(null, o)),
      e.ce && e.ce(o),
      o
   )
}
let Te = null,
   ii,
   dn,
   sa = '__VUE_INSTANCE_SETTERS__'
;(dn = po()[sa]) || (dn = po()[sa] = []),
   dn.push((e) => (Te = e)),
   (ii = (e) => {
      dn.length > 1 ? dn.forEach((t) => t(e)) : dn[0](e)
   })
const Nn = (e) => {
      ii(e), e.scope.on()
   },
   nn = () => {
      Te && Te.scope.off(), ii(null)
   }
function bc(e) {
   return e.vnode.shapeFlag & 4
}
let fs = !1
function qd(e, t = !1) {
   fs = t
   const { props: n, children: s } = e.vnode,
      r = bc(e)
   xd(e, n, r, t), kd(e, s)
   const o = r ? Yd(e, t) : void 0
   return (fs = !1), o
}
function Yd(e, t) {
   const n = e.type
   ;(e.accessCache = Object.create(null)), (e.proxy = zl(new Proxy(e.ctx, yd)))
   const { setup: s } = n
   if (s) {
      const r = (e.setupContext = s.length > 1 ? Jd(e) : null)
      Nn(e), Wn()
      const o = Mt(s, e, 0, [e.props, r])
      if ((Vn(), nn(), Nl(o))) {
         if ((o.then(nn, nn), t))
            return o
               .then((i) => {
                  ra(e, i, t)
               })
               .catch((i) => {
                  dr(i, e, 0)
               })
         e.asyncDep = o
      } else ra(e, o, t)
   } else yc(e, t)
}
function ra(e, t, n) {
   z(t)
      ? e.type.__ssrInlineRender
         ? (e.ssrRender = t)
         : (e.render = t)
      : pe(t) && (e.setupState = Jl(t)),
      yc(e, n)
}
let oa
function yc(e, t, n) {
   const s = e.type
   if (!e.render) {
      if (!t && oa && !s.render) {
         const r = s.template || ni(e).template
         if (r) {
            const { isCustomElement: o, compilerOptions: i } =
                  e.appContext.config,
               { delimiters: a, compilerOptions: l } = s,
               u = Ae(Ae({ isCustomElement: o, delimiters: a }, i), l)
            s.render = oa(r, u)
         }
      }
      e.render = s.render || rt
   }
   {
      Nn(e), Wn()
      try {
         wd(e)
      } finally {
         Vn(), nn()
      }
   }
}
function Gd(e) {
   return (
      e.attrsProxy ||
      (e.attrsProxy = new Proxy(e.attrs, {
         get(t, n) {
            return Ie(e, 'get', '$attrs'), t[n]
         },
      }))
   )
}
function Jd(e) {
   const t = (n) => {
      e.exposed = n || {}
   }
   return {
      get attrs() {
         return Gd(e)
      },
      slots: e.slots,
      emit: e.emit,
      expose: t,
   }
}
function br(e) {
   if (e.exposed)
      return (
         e.exposeProxy ||
         (e.exposeProxy = new Proxy(Jl(zl(e.exposed)), {
            get(t, n) {
               if (n in t) return t[n]
               if (n in ts) return ts[n](e)
            },
            has(t, n) {
               return n in t || n in ts
            },
         }))
      )
}
function Xd(e, t = !0) {
   return z(e) ? e.displayName || e.name : e.name || (t && e.__name)
}
function Qd(e) {
   return z(e) && '__vccOpts' in e
}
const nt = (e, t) => qf(e, t, fs)
function wc(e, t, n) {
   const s = arguments.length
   return s === 2
      ? pe(t) && !j(t)
         ? So(t)
            ? oe(e, null, [t])
            : oe(e, t)
         : oe(e, null, t)
      : (s > 3
           ? (n = Array.prototype.slice.call(arguments, 2))
           : s === 3 && So(n) && (n = [n]),
        oe(e, t, n))
}
const Zd = Symbol.for('v-scx'),
   eh = () => Tt(Zd),
   th = '3.3.7',
   nh = 'http://www.w3.org/2000/svg',
   Yt = typeof document < 'u' ? document : null,
   ia = Yt && Yt.createElement('template'),
   sh = {
      insert: (e, t, n) => {
         t.insertBefore(e, n || null)
      },
      remove: (e) => {
         const t = e.parentNode
         t && t.removeChild(e)
      },
      createElement: (e, t, n, s) => {
         const r = t
            ? Yt.createElementNS(nh, e)
            : Yt.createElement(e, n ? { is: n } : void 0)
         return (
            e === 'select' &&
               s &&
               s.multiple != null &&
               r.setAttribute('multiple', s.multiple),
            r
         )
      },
      createText: (e) => Yt.createTextNode(e),
      createComment: (e) => Yt.createComment(e),
      setText: (e, t) => {
         e.nodeValue = t
      },
      setElementText: (e, t) => {
         e.textContent = t
      },
      parentNode: (e) => e.parentNode,
      nextSibling: (e) => e.nextSibling,
      querySelector: (e) => Yt.querySelector(e),
      setScopeId(e, t) {
         e.setAttribute(t, '')
      },
      insertStaticContent(e, t, n, s, r, o) {
         const i = n ? n.previousSibling : t.lastChild
         if (r && (r === o || r.nextSibling))
            for (
               ;
               t.insertBefore(r.cloneNode(!0), n),
                  !(r === o || !(r = r.nextSibling));

            );
         else {
            ia.innerHTML = s ? `<svg>${e}</svg>` : e
            const a = ia.content
            if (s) {
               const l = a.firstChild
               for (; l.firstChild; ) a.appendChild(l.firstChild)
               a.removeChild(l)
            }
            t.insertBefore(a, n)
         }
         return [
            i ? i.nextSibling : t.firstChild,
            n ? n.previousSibling : t.lastChild,
         ]
      },
   },
   rh = Symbol('_vtc')
function oh(e, t, n) {
   const s = e[rh]
   s && (t = (t ? [t, ...s] : [...s]).join(' ')),
      t == null
         ? e.removeAttribute('class')
         : n
         ? e.setAttribute('class', t)
         : (e.className = t)
}
const ih = Symbol('_vod')
function ah(e, t, n) {
   const s = e.style,
      r = ye(n)
   if (n && !r) {
      if (t && !ye(t)) for (const o in t) n[o] == null && Oo(s, o, '')
      for (const o in n) Oo(s, o, n[o])
   } else {
      const o = s.display
      r ? t !== n && (s.cssText = n) : t && e.removeAttribute('style'),
         ih in e && (s.display = o)
   }
}
const aa = /\s*!important$/
function Oo(e, t, n) {
   if (j(n)) n.forEach((s) => Oo(e, t, s))
   else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n)
   else {
      const s = lh(e, t)
      aa.test(n)
         ? e.setProperty(Fn(s), n.replace(aa, ''), 'important')
         : (e[s] = n)
   }
}
const la = ['Webkit', 'Moz', 'ms'],
   Vr = {}
function lh(e, t) {
   const n = Vr[t]
   if (n) return n
   let s = mt(t)
   if (s !== 'filter' && s in e) return (Vr[t] = s)
   s = cr(s)
   for (let r = 0; r < la.length; r++) {
      const o = la[r] + s
      if (o in e) return (Vr[t] = o)
   }
   return t
}
const ca = 'http://www.w3.org/1999/xlink'
function ch(e, t, n, s, r) {
   if (s && t.startsWith('xlink:'))
      n == null
         ? e.removeAttributeNS(ca, t.slice(6, t.length))
         : e.setAttributeNS(ca, t, n)
   else {
      const o = vf(t)
      n == null || (o && !Pl(n))
         ? e.removeAttribute(t)
         : e.setAttribute(t, o ? '' : n)
   }
}
function uh(e, t, n, s, r, o, i) {
   if (t === 'innerHTML' || t === 'textContent') {
      s && i(s, r, o), (e[t] = n ?? '')
      return
   }
   const a = e.tagName
   if (t === 'value' && a !== 'PROGRESS' && !a.includes('-')) {
      e._value = n
      const u = a === 'OPTION' ? e.getAttribute('value') : e.value,
         c = n ?? ''
      u !== c && (e.value = c), n == null && e.removeAttribute(t)
      return
   }
   let l = !1
   if (n === '' || n == null) {
      const u = typeof e[t]
      u === 'boolean'
         ? (n = Pl(n))
         : n == null && u === 'string'
         ? ((n = ''), (l = !0))
         : u === 'number' && ((n = 0), (l = !0))
   }
   try {
      e[t] = n
   } catch {}
   l && e.removeAttribute(t)
}
function mn(e, t, n, s) {
   e.addEventListener(t, n, s)
}
function fh(e, t, n, s) {
   e.removeEventListener(t, n, s)
}
const ua = Symbol('_vei')
function dh(e, t, n, s, r = null) {
   const o = e[ua] || (e[ua] = {}),
      i = o[t]
   if (s && i) i.value = s
   else {
      const [a, l] = hh(t)
      if (s) {
         const u = (o[t] = _h(s, r))
         mn(e, a, u, l)
      } else i && (fh(e, a, i, l), (o[t] = void 0))
   }
}
const fa = /(?:Once|Passive|Capture)$/
function hh(e) {
   let t
   if (fa.test(e)) {
      t = {}
      let s
      for (; (s = e.match(fa)); )
         (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0)
   }
   return [e[2] === ':' ? e.slice(3) : Fn(e.slice(2)), t]
}
let Br = 0
const ph = Promise.resolve(),
   mh = () => Br || (ph.then(() => (Br = 0)), (Br = Date.now()))
function _h(e, t) {
   const n = (s) => {
      if (!s._vts) s._vts = Date.now()
      else if (s._vts <= n.attached) return
      ot(gh(s, n.value), t, 5, [s])
   }
   return (n.value = e), (n.attached = mh()), n
}
function gh(e, t) {
   if (j(t)) {
      const n = e.stopImmediatePropagation
      return (
         (e.stopImmediatePropagation = () => {
            n.call(e), (e._stopped = !0)
         }),
         t.map((s) => (r) => !r._stopped && s && s(r))
      )
   } else return t
}
const da = /^on[a-z]/,
   Eh = (e, t, n, s, r = !1, o, i, a, l) => {
      t === 'class'
         ? oh(e, s, r)
         : t === 'style'
         ? ah(e, n, s)
         : or(t)
         ? jo(t) || dh(e, t, n, s, i)
         : (
              t[0] === '.'
                 ? ((t = t.slice(1)), !0)
                 : t[0] === '^'
                 ? ((t = t.slice(1)), !1)
                 : vh(e, t, s, r)
           )
         ? uh(e, t, s, o, i, a, l)
         : (t === 'true-value'
              ? (e._trueValue = s)
              : t === 'false-value' && (e._falseValue = s),
           ch(e, t, s, r))
   }
function vh(e, t, n, s) {
   return s
      ? !!(
           t === 'innerHTML' ||
           t === 'textContent' ||
           (t in e && da.test(t) && z(n))
        )
      : t === 'spellcheck' ||
        t === 'draggable' ||
        t === 'translate' ||
        t === 'form' ||
        (t === 'list' && e.tagName === 'INPUT') ||
        (t === 'type' && e.tagName === 'TEXTAREA') ||
        (da.test(t) && ye(n))
      ? !1
      : t in e
}
const ha = (e) => {
   const t = e.props['onUpdate:modelValue'] || !1
   return j(t) ? (n) => Ms(t, n) : t
}
function bh(e) {
   e.target.composing = !0
}
function pa(e) {
   const t = e.target
   t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')))
}
const jr = Symbol('_assign'),
   yt = {
      created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
         e[jr] = ha(r)
         const o = s || (r.props && r.props.type === 'number')
         mn(e, t ? 'change' : 'input', (i) => {
            if (i.target.composing) return
            let a = e.value
            n && (a = a.trim()), o && (a = ho(a)), e[jr](a)
         }),
            n &&
               mn(e, 'change', () => {
                  e.value = e.value.trim()
               }),
            t ||
               (mn(e, 'compositionstart', bh),
               mn(e, 'compositionend', pa),
               mn(e, 'change', pa))
      },
      mounted(e, { value: t }) {
         e.value = t ?? ''
      },
      beforeUpdate(
         e,
         { value: t, modifiers: { lazy: n, trim: s, number: r } },
         o
      ) {
         if (
            ((e[jr] = ha(o)),
            e.composing ||
               (document.activeElement === e &&
                  e.type !== 'range' &&
                  (n ||
                     (s && e.value.trim() === t) ||
                     ((r || e.type === 'number') && ho(e.value) === t))))
         )
            return
         const i = t ?? ''
         e.value !== i && (e.value = i)
      },
   },
   yh = ['ctrl', 'shift', 'alt', 'meta'],
   wh = {
      stop: (e) => e.stopPropagation(),
      prevent: (e) => e.preventDefault(),
      self: (e) => e.target !== e.currentTarget,
      ctrl: (e) => !e.ctrlKey,
      shift: (e) => !e.shiftKey,
      alt: (e) => !e.altKey,
      meta: (e) => !e.metaKey,
      left: (e) => 'button' in e && e.button !== 0,
      middle: (e) => 'button' in e && e.button !== 1,
      right: (e) => 'button' in e && e.button !== 2,
      exact: (e, t) => yh.some((n) => e[`${n}Key`] && !t.includes(n)),
   },
   Tc =
      (e, t) =>
      (n, ...s) => {
         for (let r = 0; r < t.length; r++) {
            const o = wh[t[r]]
            if (o && o(n, t)) return
         }
         return e(n, ...s)
      },
   Th = Ae({ patchProp: Eh }, sh)
let ma
function Ah() {
   return ma || (ma = $d(Th))
}
const Sh = (...e) => {
   const t = Ah().createApp(...e),
      { mount: n } = t
   return (
      (t.mount = (s) => {
         const r = Oh(s)
         if (!r) return
         const o = t._component
         !z(o) && !o.render && !o.template && (o.template = r.innerHTML),
            (r.innerHTML = '')
         const i = n(r, !1, r instanceof SVGElement)
         return (
            r instanceof Element &&
               (r.removeAttribute('v-cloak'), r.setAttribute('data-v-app', '')),
            i
         )
      }),
      t
   )
}
function Oh(e) {
   return ye(e) ? document.querySelector(e) : e
}
const Re = (e, t) => {
      const n = e.__vccOpts || e
      for (const [s, r] of t) n[s] = r
      return n
   },
   Ch = {
      name: 'LoginPageView',
      data() {
         return { email: '', password: '' }
      },
      methods: {
         login() {
            this.$router.push('/studenthome')
         },
      },
   },
   yr = (e) => (mr('data-v-1b2cf726'), (e = e()), _r(), e),
   Nh = { class: 'login-container' },
   xh = yr(() => D('h1', null, 'Login', -1)),
   Rh = { class: 'form-container' },
   Ph = { class: 'input-field' },
   kh = yr(() => D('label', { for: 'email' }, 'Email:', -1)),
   Dh = { class: 'input-field' },
   $h = yr(() => D('label', { for: 'password' }, 'Password:', -1)),
   Lh = yr(() => D('button', { type: 'submit' }, 'Login', -1))
function Ih(e, t, n, s, r, o) {
   return (
      ne(),
      le('div', Nh, [
         xh,
         D(
            'form',
            {
               onSubmit:
                  t[2] ||
                  (t[2] = Tc((...i) => o.login && o.login(...i), ['prevent'])),
            },
            [
               D('div', Rh, [
                  D('div', Ph, [
                     kh,
                     bt(
                        D(
                           'input',
                           {
                              type: 'email',
                              id: 'email',
                              'onUpdate:modelValue':
                                 t[0] || (t[0] = (i) => (r.email = i)),
                              required: '',
                           },
                           null,
                           512
                        ),
                        [[yt, r.email]]
                     ),
                  ]),
                  D('div', Dh, [
                     $h,
                     bt(
                        D(
                           'input',
                           {
                              type: 'password',
                              id: 'password',
                              'onUpdate:modelValue':
                                 t[1] || (t[1] = (i) => (r.password = i)),
                              required: '',
                           },
                           null,
                           512
                        ),
                        [[yt, r.password]]
                     ),
                  ]),
                  Lh,
               ]),
            ],
            32
         ),
      ])
   )
}
const _a = Re(Ch, [
      ['render', Ih],
      ['__scopeId', 'data-v-1b2cf726'],
   ]),
   Mh = {
      name: 'WeekDropdown',
      props: { displayedWeeks: Array, selectWeek: String, currentWeek: String },
      data() {
         return { hasSelectedWeek: ms(!1) }
      },
      methods: {
         userSelectsWeek() {
            this.hasSelectedWeek = !0
         },
         getCurrentWeek() {
            var e = new Date(),
               t = String(e.getDate()).padStart(2, '0'),
               n = String(e.getMonth() + 1).padStart(2, '0'),
               s = e.getFullYear()
            e = s + '-' + n + '-' + t
            var r = this.weeks.find((o) => {
               var i = o.split(' ')[0],
                  a = o.split(' ')[2]
               return e >= i && e <= a
            })
            return r
         },
      },
      computed: {},
   },
   Hh = { class: 'dropdown-center' },
   Fh = {
      class: 'btn btn-primary dropdown-toggle',
      href: '#',
      role: 'button',
      'data-bs-toggle': 'dropdown',
      'aria-expanded': 'false',
      style: 'width: 30%;',
   },
   Wh = { class: 'dropdown-menu', style: 'columns : 3;' },
   Vh = ['value', 'onClick'],
   Bh = { class: 'dropdown-item', href: '#' }
function jh(e, t, n, s, r, o) {
   return (
      ne(),
      le('div', Hh, [
         D('a', Fh, Be(n.selectWeek ? this.selectWeek : this.currentWeek), 1),
         D('ul', Wh, [
            (ne(!0),
            le(
               be,
               null,
               tn(
                  n.displayedWeeks,
                  (i) => (
                     ne(),
                     le(
                        'li',
                        {
                           value: i.value,
                           onClick: (a) => (
                              e.$emit('selectWeek', i), o.userSelectsWeek()
                           ),
                        },
                        [D('a', Bh, Be(i), 1)],
                        8,
                        Vh
                     )
                  )
               ),
               256
            )),
         ]),
      ])
   )
}
const wr = Re(Mh, [['render', jh]])
const Uh = {
      name: 'WarList',
      props: { tasks: Array },
      components: { WeekDropdown: wr },
      data() {
         return {
            warDates2023: [
               '2023-09-01 to 2023-09-03',
               '2023-09-04 to 2023-09-10',
               '2023-09-11 to 2023-09-17',
               '2023-09-18 to 2023-09-24',
               '2023-09-25 to 2023-10-01',
               '2023-10-02 to 2023-10-08',
               '2023-10-09 to 2023-10-15',
               '2023-10-16 to 2023-10-22',
               '2023-10-23 to 2023-10-29',
               '2023-10-30 to 2023-11-05',
               '2023-11-06 to 2023-11-12',
               '2023-11-13 to 2023-11-19',
               '2023-11-20 to 2023-11-26',
               '2023-11-27 to 2023-12-03',
               '2023-12-04 to 2023-12-10',
               '2023-12-11 to 2023-12-15',
            ],
            newTask: {
               user: 'John Doe',
               task: '',
               plannedTask: '',
               description: '',
               plannedHours: 0,
               actualHours: 0,
               status: '',
            },
            isFormVisible: !1,
         }
      },
      methods: {
         addTask() {
            this.validateTask() &&
               (this.tasks.push({ ...this.newTask }), this.resetForm())
         },
         validateTask() {
            return !0
         },
         resetForm() {
            this.newTask = {
               user: 'John Doe',
               task: '',
               plannedTask: '',
               description: '',
               plannedHours: 0,
               actualHours: 0,
               status: '',
            }
         },
         toggleFormVisibility() {
            this.isFormVisible = !this.isFormVisible
         },
      },
   },
   Kh = (e) => (mr('data-v-0d25627c'), (e = e()), _r(), e),
   zh = { class: 'WarList-container' },
   qh = { class: 'table vh-45' },
   Yh = Kh(() =>
      D(
         'thead',
         null,
         [
            D('tr', null, [
               D('th', { scope: 'col' }, 'User'),
               D('th', { scope: 'col' }, 'Task'),
               D('th', { scope: 'col' }, 'Planned Task'),
               D('th', { scope: 'col' }, 'Description'),
               D('th', { scope: 'col' }, 'Planned Hours'),
               D('th', { scope: 'col' }, 'Actual Hours'),
               D('th', { scope: 'col' }, 'Status'),
            ]),
         ],
         -1
      )
   )
function Gh(e, t, n, s, r, o) {
   return (
      ne(),
      le('div', zh, [
         D('table', qh, [
            Yh,
            D('tbody', null, [
               (ne(!0),
               le(
                  be,
                  null,
                  tn(
                     n.tasks,
                     (i, a) => (
                        ne(),
                        le('tr', { key: a }, [
                           D('td', null, Be(i.user), 1),
                           D('td', null, Be(i.task), 1),
                           D('td', null, Be(i.plannedTask), 1),
                           D('td', null, Be(i.description), 1),
                           D('td', null, Be(i.plannedHours), 1),
                           D('td', null, Be(i.actualHours), 1),
                           D('td', null, Be(i.status), 1),
                        ])
                     )
                  ),
                  128
               )),
            ]),
         ]),
      ])
   )
}
const Ac = Re(Uh, [
      ['render', Gh],
      ['__scopeId', 'data-v-0d25627c'],
   ]),
   Jh = {
      name: 'AddWarTask',
      data() {
         return {
            newTask: {
               task: '',
               plannedTask: '',
               description: '',
               plannedHours: '',
               actualHours: '',
               status: '',
            },
            isFormVisible: !1,
         }
      },
      methods: {
         toggleFormVisibility() {
            this.isFormVisible = !this.isFormVisible
         },
      },
   },
   Xh = D('label', { for: 'task' }, 'Task:', -1),
   Qh = D('label', { for: 'plannedTask' }, 'Planned Task:', -1),
   Zh = D('label', { for: 'description' }, 'Description:', -1),
   ep = D('label', { for: 'plannedHours' }, 'Planned Hours:', -1),
   tp = D('label', { for: 'actualHours' }, 'Actual Hours:', -1),
   np = D('label', { for: 'status' }, 'Status:', -1)
function sp(e, t, n, s, r, o) {
   return (
      ne(),
      le(
         be,
         null,
         [
            r.isFormVisible
               ? (ne(),
                 le(
                    'form',
                    {
                       key: 0,
                       onSubmit:
                          t[7] ||
                          (t[7] = Tc(
                             (...i) => e.addTask && e.addTask(...i),
                             ['prevent']
                          )),
                    },
                    [
                       Xh,
                       bt(
                          D(
                             'input',
                             {
                                'onUpdate:modelValue':
                                   t[0] || (t[0] = (i) => (r.newTask.task = i)),
                                type: 'text',
                                required: '',
                             },
                             null,
                             512
                          ),
                          [[yt, r.newTask.task]]
                       ),
                       Qh,
                       bt(
                          D(
                             'input',
                             {
                                'onUpdate:modelValue':
                                   t[1] ||
                                   (t[1] = (i) => (r.newTask.plannedTask = i)),
                                type: 'text',
                                required: '',
                             },
                             null,
                             512
                          ),
                          [[yt, r.newTask.plannedTask]]
                       ),
                       Zh,
                       bt(
                          D(
                             'textarea',
                             {
                                'onUpdate:modelValue':
                                   t[2] ||
                                   (t[2] = (i) => (r.newTask.description = i)),
                                required: '',
                             },
                             null,
                             512
                          ),
                          [[yt, r.newTask.description]]
                       ),
                       ep,
                       bt(
                          D(
                             'input',
                             {
                                'onUpdate:modelValue':
                                   t[3] ||
                                   (t[3] = (i) => (r.newTask.plannedHours = i)),
                                type: 'number',
                                required: '',
                             },
                             null,
                             512
                          ),
                          [[yt, r.newTask.plannedHours]]
                       ),
                       tp,
                       bt(
                          D(
                             'input',
                             {
                                'onUpdate:modelValue':
                                   t[4] ||
                                   (t[4] = (i) => (r.newTask.actualHours = i)),
                                type: 'number',
                                required: '',
                             },
                             null,
                             512
                          ),
                          [[yt, r.newTask.actualHours]]
                       ),
                       np,
                       bt(
                          D(
                             'input',
                             {
                                'onUpdate:modelValue':
                                   t[5] ||
                                   (t[5] = (i) => (r.newTask.status = i)),
                                type: 'text',
                                required: '',
                             },
                             null,
                             512
                          ),
                          [[yt, r.newTask.status]]
                       ),
                       D(
                          'button',
                          {
                             onClick:
                                t[6] ||
                                (t[6] = (i) => e.$emit('addTask', r.newTask)),
                          },
                          'Submit'
                       ),
                    ],
                    32
                 ))
               : Bd('', !0),
            D(
               'button',
               {
                  onClick:
                     t[8] ||
                     (t[8] = (...i) =>
                        o.toggleFormVisibility && o.toggleFormVisibility(...i)),
               },
               'Add Task'
            ),
         ],
         64
      )
   )
}
const Sc = Re(Jh, [['render', sp]])
const rp = {
      name: 'StudentWarView',
      components: { WarList: Ac, WeekDropdown: wr, AddWarTask: Sc },
      data() {
         return {
            selectedWeek: ms(null),
            tasks: [],
            weeks: [
               '2023-09-01 to 2023-09-03',
               '2023-09-04 to 2023-09-10',
               '2023-09-11 to 2023-09-17',
               '2023-09-18 to 2023-09-24',
               '2023-09-25 to 2023-10-01',
               '2023-10-02 to 2023-10-08',
               '2023-10-09 to 2023-10-15',
               '2023-10-16 to 2023-10-22',
               '2023-10-23 to 2023-10-29',
               '2023-10-30 to 2023-11-05',
               '2023-11-06 to 2023-11-12',
               '2023-11-13 to 2023-11-19',
               '2023-11-20 to 2023-11-26',
               '2023-11-27 to 2023-12-03',
               '2023-12-04 to 2023-12-10',
               '2023-12-11 to 2023-12-15',
            ],
         }
      },
      methods: {
         addTask(e) {
            this.tasks.push(e)
         },
         getStudentWar() {},
         setSelectedWeek(e) {
            this.selectedWeek == null
               ? (this.selectedWeek = this.getCurrentWeek())
               : (this.selectedWeek = e)
         },
         getCurrentWeek() {
            var e = new Date(),
               t = String(e.getDate()).padStart(2, '0'),
               n = String(e.getMonth() + 1).padStart(2, '0'),
               s = e.getFullYear()
            e = s + '-' + n + '-' + t
            var r = this.weeks.find((o) => {
               var i = o.split(' ')[0],
                  a = o.split(' ')[2]
               return e >= i && e <= a
            })
            return r
         },
      },
      computed: {
         currentWeekVar() {
            return this.getCurrentWeek()
         },
      },
      mounted() {
         this.setSelectedWeek()
      },
   },
   op = { class: 'container' }
function ip(e, t, n, s, r, o) {
   const i = Le('WeekDropdown'),
      a = Le('WarList'),
      l = Le('AddWarTask')
   return (
      ne(),
      le('div', op, [
         oe(
            i,
            {
               'current-week': o.currentWeekVar,
               'select-week': this.selectedWeek,
               'displayed-weeks': r.weeks,
               onSelectWeek: o.setSelectedWeek,
            },
            null,
            8,
            ['current-week', 'select-week', 'displayed-weeks', 'onSelectWeek']
         ),
         oe(a, { tasks: r.tasks }, null, 8, ['tasks']),
         oe(l, { onAddTask: o.addTask }, null, 8, ['onAddTask']),
      ])
   )
}
const ga = Re(rp, [
   ['render', ip],
   ['__scopeId', 'data-v-7efcb25d'],
])
const ap = {
      __name: 'App',
      setup(e) {
         return (t, n) => {
            const s = Le('router-view')
            return ne(), ri(s)
         }
      },
   },
   lp = Re(ap, [['__scopeId', 'data-v-3050289c']])
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const _n = typeof window < 'u'
function cp(e) {
   return e.__esModule || e[Symbol.toStringTag] === 'Module'
}
const ae = Object.assign
function Ur(e, t) {
   const n = {}
   for (const s in t) {
      const r = t[s]
      n[s] = it(r) ? r.map(e) : e(r)
   }
   return n
}
const ss = () => {},
   it = Array.isArray,
   up = /\/$/,
   fp = (e) => e.replace(up, '')
function Kr(e, t, n = '/') {
   let s,
      r = {},
      o = '',
      i = ''
   const a = t.indexOf('#')
   let l = t.indexOf('?')
   return (
      a < l && a >= 0 && (l = -1),
      l > -1 &&
         ((s = t.slice(0, l)),
         (o = t.slice(l + 1, a > -1 ? a : t.length)),
         (r = e(o))),
      a > -1 && ((s = s || t.slice(0, a)), (i = t.slice(a, t.length))),
      (s = mp(s ?? t, n)),
      { fullPath: s + (o && '?') + o + i, path: s, query: r, hash: i }
   )
}
function dp(e, t) {
   const n = t.query ? e(t.query) : ''
   return t.path + (n && '?') + n + (t.hash || '')
}
function Ea(e, t) {
   return !t || !e.toLowerCase().startsWith(t.toLowerCase())
      ? e
      : e.slice(t.length) || '/'
}
function hp(e, t, n) {
   const s = t.matched.length - 1,
      r = n.matched.length - 1
   return (
      s > -1 &&
      s === r &&
      xn(t.matched[s], n.matched[r]) &&
      Oc(t.params, n.params) &&
      e(t.query) === e(n.query) &&
      t.hash === n.hash
   )
}
function xn(e, t) {
   return (e.aliasOf || e) === (t.aliasOf || t)
}
function Oc(e, t) {
   if (Object.keys(e).length !== Object.keys(t).length) return !1
   for (const n in e) if (!pp(e[n], t[n])) return !1
   return !0
}
function pp(e, t) {
   return it(e) ? va(e, t) : it(t) ? va(t, e) : e === t
}
function va(e, t) {
   return it(t)
      ? e.length === t.length && e.every((n, s) => n === t[s])
      : e.length === 1 && e[0] === t
}
function mp(e, t) {
   if (e.startsWith('/')) return e
   if (!e) return t
   const n = t.split('/'),
      s = e.split('/'),
      r = s[s.length - 1]
   ;(r === '..' || r === '.') && s.push('')
   let o = n.length - 1,
      i,
      a
   for (i = 0; i < s.length; i++)
      if (((a = s[i]), a !== '.'))
         if (a === '..') o > 1 && o--
         else break
   return (
      n.slice(0, o).join('/') +
      '/' +
      s.slice(i - (i === s.length ? 1 : 0)).join('/')
   )
}
var ds
;(function (e) {
   ;(e.pop = 'pop'), (e.push = 'push')
})(ds || (ds = {}))
var rs
;(function (e) {
   ;(e.back = 'back'), (e.forward = 'forward'), (e.unknown = '')
})(rs || (rs = {}))
function _p(e) {
   if (!e)
      if (_n) {
         const t = document.querySelector('base')
         ;(e = (t && t.getAttribute('href')) || '/'),
            (e = e.replace(/^\w+:\/\/[^\/]+/, ''))
      } else e = '/'
   return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), fp(e)
}
const gp = /^[^#]+#/
function Ep(e, t) {
   return e.replace(gp, '#') + t
}
function vp(e, t) {
   const n = document.documentElement.getBoundingClientRect(),
      s = e.getBoundingClientRect()
   return {
      behavior: t.behavior,
      left: s.left - n.left - (t.left || 0),
      top: s.top - n.top - (t.top || 0),
   }
}
const Tr = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function bp(e) {
   let t
   if ('el' in e) {
      const n = e.el,
         s = typeof n == 'string' && n.startsWith('#'),
         r =
            typeof n == 'string'
               ? s
                  ? document.getElementById(n.slice(1))
                  : document.querySelector(n)
               : n
      if (!r) return
      t = vp(r, e)
   } else t = e
   'scrollBehavior' in document.documentElement.style
      ? window.scrollTo(t)
      : window.scrollTo(
           t.left != null ? t.left : window.pageXOffset,
           t.top != null ? t.top : window.pageYOffset
        )
}
function ba(e, t) {
   return (history.state ? history.state.position - t : -1) + e
}
const Co = new Map()
function yp(e, t) {
   Co.set(e, t)
}
function wp(e) {
   const t = Co.get(e)
   return Co.delete(e), t
}
let Tp = () => location.protocol + '//' + location.host
function Cc(e, t) {
   const { pathname: n, search: s, hash: r } = t,
      o = e.indexOf('#')
   if (o > -1) {
      let a = r.includes(e.slice(o)) ? e.slice(o).length : 1,
         l = r.slice(a)
      return l[0] !== '/' && (l = '/' + l), Ea(l, '')
   }
   return Ea(n, e) + s + r
}
function Ap(e, t, n, s) {
   let r = [],
      o = [],
      i = null
   const a = ({ state: p }) => {
      const _ = Cc(e, location),
         g = n.value,
         E = t.value
      let O = 0
      if (p) {
         if (((n.value = _), (t.value = p), i && i === g)) {
            i = null
            return
         }
         O = E ? p.position - E.position : 0
      } else s(_)
      r.forEach((N) => {
         N(n.value, g, {
            delta: O,
            type: ds.pop,
            direction: O ? (O > 0 ? rs.forward : rs.back) : rs.unknown,
         })
      })
   }
   function l() {
      i = n.value
   }
   function u(p) {
      r.push(p)
      const _ = () => {
         const g = r.indexOf(p)
         g > -1 && r.splice(g, 1)
      }
      return o.push(_), _
   }
   function c() {
      const { history: p } = window
      p.state && p.replaceState(ae({}, p.state, { scroll: Tr() }), '')
   }
   function d() {
      for (const p of o) p()
      ;(o = []),
         window.removeEventListener('popstate', a),
         window.removeEventListener('beforeunload', c)
   }
   return (
      window.addEventListener('popstate', a),
      window.addEventListener('beforeunload', c, { passive: !0 }),
      { pauseListeners: l, listen: u, destroy: d }
   )
}
function ya(e, t, n, s = !1, r = !1) {
   return {
      back: e,
      current: t,
      forward: n,
      replaced: s,
      position: window.history.length,
      scroll: r ? Tr() : null,
   }
}
function Sp(e) {
   const { history: t, location: n } = window,
      s = { value: Cc(e, n) },
      r = { value: t.state }
   r.value ||
      o(
         s.value,
         {
            back: null,
            current: s.value,
            forward: null,
            position: t.length - 1,
            replaced: !0,
            scroll: null,
         },
         !0
      )
   function o(l, u, c) {
      const d = e.indexOf('#'),
         p =
            d > -1
               ? (n.host && document.querySelector('base') ? e : e.slice(d)) + l
               : Tp() + e + l
      try {
         t[c ? 'replaceState' : 'pushState'](u, '', p), (r.value = u)
      } catch (_) {
         console.error(_), n[c ? 'replace' : 'assign'](p)
      }
   }
   function i(l, u) {
      const c = ae({}, t.state, ya(r.value.back, l, r.value.forward, !0), u, {
         position: r.value.position,
      })
      o(l, c, !0), (s.value = l)
   }
   function a(l, u) {
      const c = ae({}, r.value, t.state, { forward: l, scroll: Tr() })
      o(c.current, c, !0)
      const d = ae({}, ya(s.value, l, null), { position: c.position + 1 }, u)
      o(l, d, !1), (s.value = l)
   }
   return { location: s, state: r, push: a, replace: i }
}
function Op(e) {
   e = _p(e)
   const t = Sp(e),
      n = Ap(e, t.state, t.location, t.replace)
   function s(o, i = !0) {
      i || n.pauseListeners(), history.go(o)
   }
   const r = ae(
      { location: '', base: e, go: s, createHref: Ep.bind(null, e) },
      t,
      n
   )
   return (
      Object.defineProperty(r, 'location', {
         enumerable: !0,
         get: () => t.location.value,
      }),
      Object.defineProperty(r, 'state', {
         enumerable: !0,
         get: () => t.state.value,
      }),
      r
   )
}
function Cp(e) {
   return typeof e == 'string' || (e && typeof e == 'object')
}
function Nc(e) {
   return typeof e == 'string' || typeof e == 'symbol'
}
const Pt = {
      path: '/',
      name: void 0,
      params: {},
      query: {},
      hash: '',
      fullPath: '/',
      matched: [],
      meta: {},
      redirectedFrom: void 0,
   },
   xc = Symbol('')
var wa
;(function (e) {
   ;(e[(e.aborted = 4)] = 'aborted'),
      (e[(e.cancelled = 8)] = 'cancelled'),
      (e[(e.duplicated = 16)] = 'duplicated')
})(wa || (wa = {}))
function Rn(e, t) {
   return ae(new Error(), { type: e, [xc]: !0 }, t)
}
function Et(e, t) {
   return e instanceof Error && xc in e && (t == null || !!(e.type & t))
}
const Ta = '[^/]+?',
   Np = { sensitive: !1, strict: !1, start: !0, end: !0 },
   xp = /[.+*?^${}()[\]/\\]/g
function Rp(e, t) {
   const n = ae({}, Np, t),
      s = []
   let r = n.start ? '^' : ''
   const o = []
   for (const u of e) {
      const c = u.length ? [] : [90]
      n.strict && !u.length && (r += '/')
      for (let d = 0; d < u.length; d++) {
         const p = u[d]
         let _ = 40 + (n.sensitive ? 0.25 : 0)
         if (p.type === 0)
            d || (r += '/'), (r += p.value.replace(xp, '\\$&')), (_ += 40)
         else if (p.type === 1) {
            const { value: g, repeatable: E, optional: O, regexp: N } = p
            o.push({ name: g, repeatable: E, optional: O })
            const P = N || Ta
            if (P !== Ta) {
               _ += 10
               try {
                  new RegExp(`(${P})`)
               } catch (C) {
                  throw new Error(
                     `Invalid custom RegExp for param "${g}" (${P}): ` +
                        C.message
                  )
               }
            }
            let M = E ? `((?:${P})(?:/(?:${P}))*)` : `(${P})`
            d || (M = O && u.length < 2 ? `(?:/${M})` : '/' + M),
               O && (M += '?'),
               (r += M),
               (_ += 20),
               O && (_ += -8),
               E && (_ += -20),
               P === '.*' && (_ += -50)
         }
         c.push(_)
      }
      s.push(c)
   }
   if (n.strict && n.end) {
      const u = s.length - 1
      s[u][s[u].length - 1] += 0.7000000000000001
   }
   n.strict || (r += '/?'), n.end ? (r += '$') : n.strict && (r += '(?:/|$)')
   const i = new RegExp(r, n.sensitive ? '' : 'i')
   function a(u) {
      const c = u.match(i),
         d = {}
      if (!c) return null
      for (let p = 1; p < c.length; p++) {
         const _ = c[p] || '',
            g = o[p - 1]
         d[g.name] = _ && g.repeatable ? _.split('/') : _
      }
      return d
   }
   function l(u) {
      let c = '',
         d = !1
      for (const p of e) {
         ;(!d || !c.endsWith('/')) && (c += '/'), (d = !1)
         for (const _ of p)
            if (_.type === 0) c += _.value
            else if (_.type === 1) {
               const { value: g, repeatable: E, optional: O } = _,
                  N = g in u ? u[g] : ''
               if (it(N) && !E)
                  throw new Error(
                     `Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`
                  )
               const P = it(N) ? N.join('/') : N
               if (!P)
                  if (O)
                     p.length < 2 &&
                        (c.endsWith('/') ? (c = c.slice(0, -1)) : (d = !0))
                  else throw new Error(`Missing required param "${g}"`)
               c += P
            }
      }
      return c || '/'
   }
   return { re: i, score: s, keys: o, parse: a, stringify: l }
}
function Pp(e, t) {
   let n = 0
   for (; n < e.length && n < t.length; ) {
      const s = t[n] - e[n]
      if (s) return s
      n++
   }
   return e.length < t.length
      ? e.length === 1 && e[0] === 40 + 40
         ? -1
         : 1
      : e.length > t.length
      ? t.length === 1 && t[0] === 40 + 40
         ? 1
         : -1
      : 0
}
function kp(e, t) {
   let n = 0
   const s = e.score,
      r = t.score
   for (; n < s.length && n < r.length; ) {
      const o = Pp(s[n], r[n])
      if (o) return o
      n++
   }
   if (Math.abs(r.length - s.length) === 1) {
      if (Aa(s)) return 1
      if (Aa(r)) return -1
   }
   return r.length - s.length
}
function Aa(e) {
   const t = e[e.length - 1]
   return e.length > 0 && t[t.length - 1] < 0
}
const Dp = { type: 0, value: '' },
   $p = /[a-zA-Z0-9_]/
function Lp(e) {
   if (!e) return [[]]
   if (e === '/') return [[Dp]]
   if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`)
   function t(_) {
      throw new Error(`ERR (${n})/"${u}": ${_}`)
   }
   let n = 0,
      s = n
   const r = []
   let o
   function i() {
      o && r.push(o), (o = [])
   }
   let a = 0,
      l,
      u = '',
      c = ''
   function d() {
      u &&
         (n === 0
            ? o.push({ type: 0, value: u })
            : n === 1 || n === 2 || n === 3
            ? (o.length > 1 &&
                 (l === '*' || l === '+') &&
                 t(
                    `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
                 ),
              o.push({
                 type: 1,
                 value: u,
                 regexp: c,
                 repeatable: l === '*' || l === '+',
                 optional: l === '*' || l === '?',
              }))
            : t('Invalid state to consume buffer'),
         (u = ''))
   }
   function p() {
      u += l
   }
   for (; a < e.length; ) {
      if (((l = e[a++]), l === '\\' && n !== 2)) {
         ;(s = n), (n = 4)
         continue
      }
      switch (n) {
         case 0:
            l === '/' ? (u && d(), i()) : l === ':' ? (d(), (n = 1)) : p()
            break
         case 4:
            p(), (n = s)
            break
         case 1:
            l === '('
               ? (n = 2)
               : $p.test(l)
               ? p()
               : (d(), (n = 0), l !== '*' && l !== '?' && l !== '+' && a--)
            break
         case 2:
            l === ')'
               ? c[c.length - 1] == '\\'
                  ? (c = c.slice(0, -1) + l)
                  : (n = 3)
               : (c += l)
            break
         case 3:
            d(), (n = 0), l !== '*' && l !== '?' && l !== '+' && a--, (c = '')
            break
         default:
            t('Unknown state')
            break
      }
   }
   return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), d(), i(), r
}
function Ip(e, t, n) {
   const s = Rp(Lp(e.path), n),
      r = ae(s, { record: e, parent: t, children: [], alias: [] })
   return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r
}
function Mp(e, t) {
   const n = [],
      s = new Map()
   t = Ca({ strict: !1, end: !0, sensitive: !1 }, t)
   function r(c) {
      return s.get(c)
   }
   function o(c, d, p) {
      const _ = !p,
         g = Hp(c)
      g.aliasOf = p && p.record
      const E = Ca(t, c),
         O = [g]
      if ('alias' in c) {
         const M = typeof c.alias == 'string' ? [c.alias] : c.alias
         for (const C of M)
            O.push(
               ae({}, g, {
                  components: p ? p.record.components : g.components,
                  path: C,
                  aliasOf: p ? p.record : g,
               })
            )
      }
      let N, P
      for (const M of O) {
         const { path: C } = M
         if (d && C[0] !== '/') {
            const U = d.record.path,
               K = U[U.length - 1] === '/' ? '' : '/'
            M.path = d.record.path + (C && K + C)
         }
         if (
            ((N = Ip(M, d, E)),
            p
               ? p.alias.push(N)
               : ((P = P || N),
                 P !== N && P.alias.push(N),
                 _ && c.name && !Oa(N) && i(c.name)),
            g.children)
         ) {
            const U = g.children
            for (let K = 0; K < U.length; K++) o(U[K], N, p && p.children[K])
         }
         ;(p = p || N),
            ((N.record.components && Object.keys(N.record.components).length) ||
               N.record.name ||
               N.record.redirect) &&
               l(N)
      }
      return P
         ? () => {
              i(P)
           }
         : ss
   }
   function i(c) {
      if (Nc(c)) {
         const d = s.get(c)
         d &&
            (s.delete(c),
            n.splice(n.indexOf(d), 1),
            d.children.forEach(i),
            d.alias.forEach(i))
      } else {
         const d = n.indexOf(c)
         d > -1 &&
            (n.splice(d, 1),
            c.record.name && s.delete(c.record.name),
            c.children.forEach(i),
            c.alias.forEach(i))
      }
   }
   function a() {
      return n
   }
   function l(c) {
      let d = 0
      for (
         ;
         d < n.length &&
         kp(c, n[d]) >= 0 &&
         (c.record.path !== n[d].record.path || !Rc(c, n[d]));

      )
         d++
      n.splice(d, 0, c), c.record.name && !Oa(c) && s.set(c.record.name, c)
   }
   function u(c, d) {
      let p,
         _ = {},
         g,
         E
      if ('name' in c && c.name) {
         if (((p = s.get(c.name)), !p)) throw Rn(1, { location: c })
         ;(E = p.record.name),
            (_ = ae(
               Sa(
                  d.params,
                  p.keys.filter((P) => !P.optional).map((P) => P.name)
               ),
               c.params &&
                  Sa(
                     c.params,
                     p.keys.map((P) => P.name)
                  )
            )),
            (g = p.stringify(_))
      } else if ('path' in c)
         (g = c.path),
            (p = n.find((P) => P.re.test(g))),
            p && ((_ = p.parse(g)), (E = p.record.name))
      else {
         if (
            ((p = d.name ? s.get(d.name) : n.find((P) => P.re.test(d.path))),
            !p)
         )
            throw Rn(1, { location: c, currentLocation: d })
         ;(E = p.record.name),
            (_ = ae({}, d.params, c.params)),
            (g = p.stringify(_))
      }
      const O = []
      let N = p
      for (; N; ) O.unshift(N.record), (N = N.parent)
      return { name: E, path: g, params: _, matched: O, meta: Wp(O) }
   }
   return (
      e.forEach((c) => o(c)),
      {
         addRoute: o,
         resolve: u,
         removeRoute: i,
         getRoutes: a,
         getRecordMatcher: r,
      }
   )
}
function Sa(e, t) {
   const n = {}
   for (const s of t) s in e && (n[s] = e[s])
   return n
}
function Hp(e) {
   return {
      path: e.path,
      redirect: e.redirect,
      name: e.name,
      meta: e.meta || {},
      aliasOf: void 0,
      beforeEnter: e.beforeEnter,
      props: Fp(e),
      children: e.children || [],
      instances: {},
      leaveGuards: new Set(),
      updateGuards: new Set(),
      enterCallbacks: {},
      components:
         'components' in e
            ? e.components || null
            : e.component && { default: e.component },
   }
}
function Fp(e) {
   const t = {},
      n = e.props || !1
   if ('component' in e) t.default = n
   else for (const s in e.components) t[s] = typeof n == 'object' ? n[s] : n
   return t
}
function Oa(e) {
   for (; e; ) {
      if (e.record.aliasOf) return !0
      e = e.parent
   }
   return !1
}
function Wp(e) {
   return e.reduce((t, n) => ae(t, n.meta), {})
}
function Ca(e, t) {
   const n = {}
   for (const s in e) n[s] = s in t ? t[s] : e[s]
   return n
}
function Rc(e, t) {
   return t.children.some((n) => n === e || Rc(e, n))
}
const Pc = /#/g,
   Vp = /&/g,
   Bp = /\//g,
   jp = /=/g,
   Up = /\?/g,
   kc = /\+/g,
   Kp = /%5B/g,
   zp = /%5D/g,
   Dc = /%5E/g,
   qp = /%60/g,
   $c = /%7B/g,
   Yp = /%7C/g,
   Lc = /%7D/g,
   Gp = /%20/g
function ai(e) {
   return encodeURI('' + e)
      .replace(Yp, '|')
      .replace(Kp, '[')
      .replace(zp, ']')
}
function Jp(e) {
   return ai(e).replace($c, '{').replace(Lc, '}').replace(Dc, '^')
}
function No(e) {
   return ai(e)
      .replace(kc, '%2B')
      .replace(Gp, '+')
      .replace(Pc, '%23')
      .replace(Vp, '%26')
      .replace(qp, '`')
      .replace($c, '{')
      .replace(Lc, '}')
      .replace(Dc, '^')
}
function Xp(e) {
   return No(e).replace(jp, '%3D')
}
function Qp(e) {
   return ai(e).replace(Pc, '%23').replace(Up, '%3F')
}
function Zp(e) {
   return e == null ? '' : Qp(e).replace(Bp, '%2F')
}
function Zs(e) {
   try {
      return decodeURIComponent('' + e)
   } catch {}
   return '' + e
}
function em(e) {
   const t = {}
   if (e === '' || e === '?') return t
   const s = (e[0] === '?' ? e.slice(1) : e).split('&')
   for (let r = 0; r < s.length; ++r) {
      const o = s[r].replace(kc, ' '),
         i = o.indexOf('='),
         a = Zs(i < 0 ? o : o.slice(0, i)),
         l = i < 0 ? null : Zs(o.slice(i + 1))
      if (a in t) {
         let u = t[a]
         it(u) || (u = t[a] = [u]), u.push(l)
      } else t[a] = l
   }
   return t
}
function Na(e) {
   let t = ''
   for (let n in e) {
      const s = e[n]
      if (((n = Xp(n)), s == null)) {
         s !== void 0 && (t += (t.length ? '&' : '') + n)
         continue
      }
      ;(it(s) ? s.map((o) => o && No(o)) : [s && No(s)]).forEach((o) => {
         o !== void 0 &&
            ((t += (t.length ? '&' : '') + n), o != null && (t += '=' + o))
      })
   }
   return t
}
function tm(e) {
   const t = {}
   for (const n in e) {
      const s = e[n]
      s !== void 0 &&
         (t[n] = it(s)
            ? s.map((r) => (r == null ? null : '' + r))
            : s == null
            ? s
            : '' + s)
   }
   return t
}
const nm = Symbol(''),
   xa = Symbol(''),
   li = Symbol(''),
   Ic = Symbol(''),
   xo = Symbol('')
function Gn() {
   let e = []
   function t(s) {
      return (
         e.push(s),
         () => {
            const r = e.indexOf(s)
            r > -1 && e.splice(r, 1)
         }
      )
   }
   function n() {
      e = []
   }
   return { add: t, list: () => e.slice(), reset: n }
}
function Lt(e, t, n, s, r) {
   const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || [])
   return () =>
      new Promise((i, a) => {
         const l = (d) => {
               d === !1
                  ? a(Rn(4, { from: n, to: t }))
                  : d instanceof Error
                  ? a(d)
                  : Cp(d)
                  ? a(Rn(2, { from: t, to: d }))
                  : (o &&
                       s.enterCallbacks[r] === o &&
                       typeof d == 'function' &&
                       o.push(d),
                    i())
            },
            u = e.call(s && s.instances[r], t, n, l)
         let c = Promise.resolve(u)
         e.length < 3 && (c = c.then(l)), c.catch((d) => a(d))
      })
}
function zr(e, t, n, s) {
   const r = []
   for (const o of e)
      for (const i in o.components) {
         let a = o.components[i]
         if (!(t !== 'beforeRouteEnter' && !o.instances[i]))
            if (sm(a)) {
               const u = (a.__vccOpts || a)[t]
               u && r.push(Lt(u, n, s, o, i))
            } else {
               let l = a()
               r.push(() =>
                  l.then((u) => {
                     if (!u)
                        return Promise.reject(
                           new Error(
                              `Couldn't resolve component "${i}" at "${o.path}"`
                           )
                        )
                     const c = cp(u) ? u.default : u
                     o.components[i] = c
                     const p = (c.__vccOpts || c)[t]
                     return p && Lt(p, n, s, o, i)()
                  })
               )
            }
      }
   return r
}
function sm(e) {
   return (
      typeof e == 'object' ||
      'displayName' in e ||
      'props' in e ||
      '__vccOpts' in e
   )
}
function Ra(e) {
   const t = Tt(li),
      n = Tt(Ic),
      s = nt(() => t.resolve(An(e.to))),
      r = nt(() => {
         const { matched: l } = s.value,
            { length: u } = l,
            c = l[u - 1],
            d = n.matched
         if (!c || !d.length) return -1
         const p = d.findIndex(xn.bind(null, c))
         if (p > -1) return p
         const _ = Pa(l[u - 2])
         return u > 1 && Pa(c) === _ && d[d.length - 1].path !== _
            ? d.findIndex(xn.bind(null, l[u - 2]))
            : p
      }),
      o = nt(() => r.value > -1 && am(n.params, s.value.params)),
      i = nt(
         () =>
            r.value > -1 &&
            r.value === n.matched.length - 1 &&
            Oc(n.params, s.value.params)
      )
   function a(l = {}) {
      return im(l)
         ? t[An(e.replace) ? 'replace' : 'push'](An(e.to)).catch(ss)
         : Promise.resolve()
   }
   return {
      route: s,
      href: nt(() => s.value.href),
      isActive: o,
      isExactActive: i,
      navigate: a,
   }
}
const rm = oc({
      name: 'RouterLink',
      compatConfig: { MODE: 3 },
      props: {
         to: { type: [String, Object], required: !0 },
         replace: Boolean,
         activeClass: String,
         exactActiveClass: String,
         custom: Boolean,
         ariaCurrentValue: { type: String, default: 'page' },
      },
      useLink: Ra,
      setup(e, { slots: t }) {
         const n = fr(Ra(e)),
            { options: s } = Tt(li),
            r = nt(() => ({
               [ka(e.activeClass, s.linkActiveClass, 'router-link-active')]:
                  n.isActive,
               [ka(
                  e.exactActiveClass,
                  s.linkExactActiveClass,
                  'router-link-exact-active'
               )]: n.isExactActive,
            }))
         return () => {
            const o = t.default && t.default(n)
            return e.custom
               ? o
               : wc(
                    'a',
                    {
                       'aria-current': n.isExactActive
                          ? e.ariaCurrentValue
                          : null,
                       href: n.href,
                       onClick: n.navigate,
                       class: r.value,
                    },
                    o
                 )
         }
      },
   }),
   om = rm
function im(e) {
   if (
      !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
      !e.defaultPrevented &&
      !(e.button !== void 0 && e.button !== 0)
   ) {
      if (e.currentTarget && e.currentTarget.getAttribute) {
         const t = e.currentTarget.getAttribute('target')
         if (/\b_blank\b/i.test(t)) return
      }
      return e.preventDefault && e.preventDefault(), !0
   }
}
function am(e, t) {
   for (const n in t) {
      const s = t[n],
         r = e[n]
      if (typeof s == 'string') {
         if (s !== r) return !1
      } else if (
         !it(r) ||
         r.length !== s.length ||
         s.some((o, i) => o !== r[i])
      )
         return !1
   }
   return !0
}
function Pa(e) {
   return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ''
}
const ka = (e, t, n) => e ?? t ?? n,
   lm = oc({
      name: 'RouterView',
      inheritAttrs: !1,
      props: { name: { type: String, default: 'default' }, route: Object },
      compatConfig: { MODE: 3 },
      setup(e, { attrs: t, slots: n }) {
         const s = Tt(xo),
            r = nt(() => e.route || s.value),
            o = Tt(xa, 0),
            i = nt(() => {
               let u = An(o)
               const { matched: c } = r.value
               let d
               for (; (d = c[u]) && !d.components; ) u++
               return u
            }),
            a = nt(() => r.value.matched[i.value])
         Ws(
            xa,
            nt(() => i.value + 1)
         ),
            Ws(nm, a),
            Ws(xo, r)
         const l = ms()
         return (
            Hs(
               () => [l.value, a.value, e.name],
               ([u, c, d], [p, _, g]) => {
                  c &&
                     ((c.instances[d] = u),
                     _ &&
                        _ !== c &&
                        u &&
                        u === p &&
                        (c.leaveGuards.size || (c.leaveGuards = _.leaveGuards),
                        c.updateGuards.size ||
                           (c.updateGuards = _.updateGuards))),
                     u &&
                        c &&
                        (!_ || !xn(c, _) || !p) &&
                        (c.enterCallbacks[d] || []).forEach((E) => E(u))
               },
               { flush: 'post' }
            ),
            () => {
               const u = r.value,
                  c = e.name,
                  d = a.value,
                  p = d && d.components[c]
               if (!p) return Da(n.default, { Component: p, route: u })
               const _ = d.props[c],
                  g = _
                     ? _ === !0
                        ? u.params
                        : typeof _ == 'function'
                        ? _(u)
                        : _
                     : null,
                  O = wc(
                     p,
                     ae({}, g, t, {
                        onVnodeUnmounted: (N) => {
                           N.component.isUnmounted && (d.instances[c] = null)
                        },
                        ref: l,
                     })
                  )
               return Da(n.default, { Component: O, route: u }) || O
            }
         )
      },
   })
function Da(e, t) {
   if (!e) return null
   const n = e(t)
   return n.length === 1 ? n[0] : n
}
const cm = lm
function um(e) {
   const t = Mp(e.routes, e),
      n = e.parseQuery || em,
      s = e.stringifyQuery || Na,
      r = e.history,
      o = Gn(),
      i = Gn(),
      a = Gn(),
      l = jf(Pt)
   let u = Pt
   _n &&
      e.scrollBehavior &&
      'scrollRestoration' in history &&
      (history.scrollRestoration = 'manual')
   const c = Ur.bind(null, (b) => '' + b),
      d = Ur.bind(null, Zp),
      p = Ur.bind(null, Zs)
   function _(b, $) {
      let k, H
      return (
         Nc(b) ? ((k = t.getRecordMatcher(b)), (H = $)) : (H = b),
         t.addRoute(H, k)
      )
   }
   function g(b) {
      const $ = t.getRecordMatcher(b)
      $ && t.removeRoute($)
   }
   function E() {
      return t.getRoutes().map((b) => b.record)
   }
   function O(b) {
      return !!t.getRecordMatcher(b)
   }
   function N(b, $) {
      if ((($ = ae({}, $ || l.value)), typeof b == 'string')) {
         const m = Kr(n, b, $.path),
            v = t.resolve({ path: m.path }, $),
            w = r.createHref(m.fullPath)
         return ae(m, v, {
            params: p(v.params),
            hash: Zs(m.hash),
            redirectedFrom: void 0,
            href: w,
         })
      }
      let k
      if ('path' in b) k = ae({}, b, { path: Kr(n, b.path, $.path).path })
      else {
         const m = ae({}, b.params)
         for (const v in m) m[v] == null && delete m[v]
         ;(k = ae({}, b, { params: d(m) })), ($.params = d($.params))
      }
      const H = t.resolve(k, $),
         J = b.hash || ''
      H.params = c(p(H.params))
      const f = dp(s, ae({}, b, { hash: Jp(J), path: H.path })),
         h = r.createHref(f)
      return ae(
         {
            fullPath: f,
            hash: J,
            query: s === Na ? tm(b.query) : b.query || {},
         },
         H,
         { redirectedFrom: void 0, href: h }
      )
   }
   function P(b) {
      return typeof b == 'string' ? Kr(n, b, l.value.path) : ae({}, b)
   }
   function M(b, $) {
      if (u !== b) return Rn(8, { from: $, to: b })
   }
   function C(b) {
      return Q(b)
   }
   function U(b) {
      return C(ae(P(b), { replace: !0 }))
   }
   function K(b) {
      const $ = b.matched[b.matched.length - 1]
      if ($ && $.redirect) {
         const { redirect: k } = $
         let H = typeof k == 'function' ? k(b) : k
         return (
            typeof H == 'string' &&
               ((H =
                  H.includes('?') || H.includes('#')
                     ? (H = P(H))
                     : { path: H }),
               (H.params = {})),
            ae(
               {
                  query: b.query,
                  hash: b.hash,
                  params: 'path' in H ? {} : b.params,
               },
               H
            )
         )
      }
   }
   function Q(b, $) {
      const k = (u = N(b)),
         H = l.value,
         J = b.state,
         f = b.force,
         h = b.replace === !0,
         m = K(k)
      if (m)
         return Q(
            ae(P(m), {
               state: typeof m == 'object' ? ae({}, J, m.state) : J,
               force: f,
               replace: h,
            }),
            $ || k
         )
      const v = k
      v.redirectedFrom = $
      let w
      return (
         !f &&
            hp(s, H, k) &&
            ((w = Rn(16, { to: v, from: H })), ke(H, H, !0, !1)),
         (w ? Promise.resolve(w) : re(v, H))
            .catch((T) => (Et(T) ? (Et(T, 2) ? T : He(T)) : G(T, v, H)))
            .then((T) => {
               if (T) {
                  if (Et(T, 2))
                     return Q(
                        ae({ replace: h }, P(T.to), {
                           state:
                              typeof T.to == 'object'
                                 ? ae({}, J, T.to.state)
                                 : J,
                           force: f,
                        }),
                        $ || v
                     )
               } else T = ve(v, H, !0, h, J)
               return de(v, H, T), T
            })
      )
   }
   function ce(b, $) {
      const k = M(b, $)
      return k ? Promise.reject(k) : Promise.resolve()
   }
   function fe(b) {
      const $ = Fe.values().next().value
      return $ && typeof $.runWithContext == 'function'
         ? $.runWithContext(b)
         : b()
   }
   function re(b, $) {
      let k
      const [H, J, f] = fm(b, $)
      k = zr(H.reverse(), 'beforeRouteLeave', b, $)
      for (const m of H)
         m.leaveGuards.forEach((v) => {
            k.push(Lt(v, b, $))
         })
      const h = ce.bind(null, b, $)
      return (
         k.push(h),
         me(k)
            .then(() => {
               k = []
               for (const m of o.list()) k.push(Lt(m, b, $))
               return k.push(h), me(k)
            })
            .then(() => {
               k = zr(J, 'beforeRouteUpdate', b, $)
               for (const m of J)
                  m.updateGuards.forEach((v) => {
                     k.push(Lt(v, b, $))
                  })
               return k.push(h), me(k)
            })
            .then(() => {
               k = []
               for (const m of f)
                  if (m.beforeEnter)
                     if (it(m.beforeEnter))
                        for (const v of m.beforeEnter) k.push(Lt(v, b, $))
                     else k.push(Lt(m.beforeEnter, b, $))
               return k.push(h), me(k)
            })
            .then(
               () => (
                  b.matched.forEach((m) => (m.enterCallbacks = {})),
                  (k = zr(f, 'beforeRouteEnter', b, $)),
                  k.push(h),
                  me(k)
               )
            )
            .then(() => {
               k = []
               for (const m of i.list()) k.push(Lt(m, b, $))
               return k.push(h), me(k)
            })
            .catch((m) => (Et(m, 8) ? m : Promise.reject(m)))
      )
   }
   function de(b, $, k) {
      a.list().forEach((H) => fe(() => H(b, $, k)))
   }
   function ve(b, $, k, H, J) {
      const f = M(b, $)
      if (f) return f
      const h = $ === Pt,
         m = _n ? history.state : {}
      k &&
         (H || h
            ? r.replace(b.fullPath, ae({ scroll: h && m && m.scroll }, J))
            : r.push(b.fullPath, J)),
         (l.value = b),
         ke(b, $, k, h),
         He()
   }
   let ue
   function Me() {
      ue ||
         (ue = r.listen((b, $, k) => {
            if (!We.listening) return
            const H = N(b),
               J = K(H)
            if (J) {
               Q(ae(J, { replace: !0 }), H).catch(ss)
               return
            }
            u = H
            const f = l.value
            _n && yp(ba(f.fullPath, k.delta), Tr()),
               re(H, f)
                  .catch((h) =>
                     Et(h, 12)
                        ? h
                        : Et(h, 2)
                        ? (Q(h.to, H)
                             .then((m) => {
                                Et(m, 20) &&
                                   !k.delta &&
                                   k.type === ds.pop &&
                                   r.go(-1, !1)
                             })
                             .catch(ss),
                          Promise.reject())
                        : (k.delta && r.go(-k.delta, !1), G(h, H, f))
                  )
                  .then((h) => {
                     ;(h = h || ve(H, f, !1)),
                        h &&
                           (k.delta && !Et(h, 8)
                              ? r.go(-k.delta, !1)
                              : k.type === ds.pop && Et(h, 20) && r.go(-1, !1)),
                        de(H, f, h)
                  })
                  .catch(ss)
         }))
   }
   let Pe = Gn(),
      ee = Gn(),
      q
   function G(b, $, k) {
      He(b)
      const H = ee.list()
      return (
         H.length ? H.forEach((J) => J(b, $, k)) : console.error(b),
         Promise.reject(b)
      )
   }
   function we() {
      return q && l.value !== Pt
         ? Promise.resolve()
         : new Promise((b, $) => {
              Pe.add([b, $])
           })
   }
   function He(b) {
      return (
         q ||
            ((q = !b),
            Me(),
            Pe.list().forEach(([$, k]) => (b ? k(b) : $())),
            Pe.reset()),
         b
      )
   }
   function ke(b, $, k, H) {
      const { scrollBehavior: J } = e
      if (!_n || !J) return Promise.resolve()
      const f =
         (!k && wp(ba(b.fullPath, 0))) ||
         ((H || !k) && history.state && history.state.scroll) ||
         null
      return Ql()
         .then(() => J(b, $, f))
         .then((h) => h && bp(h))
         .catch((h) => G(h, b, $))
   }
   const _e = (b) => r.go(b)
   let Qe
   const Fe = new Set(),
      We = {
         currentRoute: l,
         listening: !0,
         addRoute: _,
         removeRoute: g,
         hasRoute: O,
         getRoutes: E,
         resolve: N,
         options: e,
         push: C,
         replace: U,
         go: _e,
         back: () => _e(-1),
         forward: () => _e(1),
         beforeEach: o.add,
         beforeResolve: i.add,
         afterEach: a.add,
         onError: ee.add,
         isReady: we,
         install(b) {
            const $ = this
            b.component('RouterLink', om),
               b.component('RouterView', cm),
               (b.config.globalProperties.$router = $),
               Object.defineProperty(b.config.globalProperties, '$route', {
                  enumerable: !0,
                  get: () => An(l),
               }),
               _n &&
                  !Qe &&
                  l.value === Pt &&
                  ((Qe = !0), C(r.location).catch((J) => {}))
            const k = {}
            for (const J in Pt)
               Object.defineProperty(k, J, {
                  get: () => l.value[J],
                  enumerable: !0,
               })
            b.provide(li, $), b.provide(Ic, jl(k)), b.provide(xo, l)
            const H = b.unmount
            Fe.add(b),
               (b.unmount = function () {
                  Fe.delete(b),
                     Fe.size < 1 &&
                        ((u = Pt),
                        ue && ue(),
                        (ue = null),
                        (l.value = Pt),
                        (Qe = !1),
                        (q = !1)),
                     H()
               })
         },
      }
   function me(b) {
      return b.reduce(($, k) => $.then(() => fe(k)), Promise.resolve())
   }
   return We
}
function fm(e, t) {
   const n = [],
      s = [],
      r = [],
      o = Math.max(t.matched.length, e.matched.length)
   for (let i = 0; i < o; i++) {
      const a = t.matched[i]
      a && (e.matched.find((u) => xn(u, a)) ? s.push(a) : n.push(a))
      const l = e.matched[i]
      l && (t.matched.find((u) => xn(u, l)) || r.push(l))
   }
   return [n, s, r]
}
const dm = { name: 'NavbarSide' },
   hm = { class: 'nav nav-pills flex-column justify-content' },
   pm = { class: 'nav-item' },
   mm = { class: 'nav-item' },
   _m = { class: 'nav-item' },
   gm = { class: 'nav-item flex-end' }
function Em(e, t, n, s, r, o) {
   const i = Le('router-link')
   return (
      ne(),
      le('ul', hm, [
         D('li', pm, [
            oe(
               i,
               { to: '/studenthome/team' },
               { default: Gt(() => [Xt('Team')]), _: 1 }
            ),
         ]),
         D('li', mm, [
            oe(
               i,
               { to: '/studenthome/studentpeereval' },
               { default: Gt(() => [Xt('PeerEval')]), _: 1 }
            ),
         ]),
         D('li', _m, [
            oe(
               i,
               { to: '/studenthome/studentwar' },
               { default: Gt(() => [Xt('War')]), _: 1 }
            ),
         ]),
         D('li', gm, [
            oe(i, { to: '/' }, { default: Gt(() => [Xt('Logout')]), _: 1 }),
         ]),
      ])
   )
}
const Mc = Re(dm, [
   ['render', Em],
   ['__scopeId', 'data-v-c2a80c5d'],
])
const vm = {
      name: 'StudentHomePageView',
      components: { NavbarSide: Mc },
      data() {
         return {}
      },
      methods: {},
      computed: {},
   },
   bm = { class: 'sidebar' },
   ym = { class: 'main-item' }
function wm(e, t, n, s, r, o) {
   const i = Le('NavbarSide'),
      a = Le('router-view')
   return ne(), le(be, null, [D('div', bm, [oe(i)]), D('div', ym, [oe(a)])], 64)
}
const Tm = Re(vm, [
   ['render', wm],
   ['__scopeId', 'data-v-6a5341a3'],
])
function Hc(e, t) {
   return function () {
      return e.apply(t, arguments)
   }
}
const { toString: Am } = Object.prototype,
   { getPrototypeOf: ci } = Object,
   Ar = ((e) => (t) => {
      const n = Am.call(t)
      return e[n] || (e[n] = n.slice(8, -1).toLowerCase())
   })(Object.create(null)),
   gt = (e) => ((e = e.toLowerCase()), (t) => Ar(t) === e),
   Sr = (e) => (t) => typeof t === e,
   { isArray: Bn } = Array,
   hs = Sr('undefined')
function Sm(e) {
   return (
      e !== null &&
      !hs(e) &&
      e.constructor !== null &&
      !hs(e.constructor) &&
      qe(e.constructor.isBuffer) &&
      e.constructor.isBuffer(e)
   )
}
const Fc = gt('ArrayBuffer')
function Om(e) {
   let t
   return (
      typeof ArrayBuffer < 'u' && ArrayBuffer.isView
         ? (t = ArrayBuffer.isView(e))
         : (t = e && e.buffer && Fc(e.buffer)),
      t
   )
}
const Cm = Sr('string'),
   qe = Sr('function'),
   Wc = Sr('number'),
   Or = (e) => e !== null && typeof e == 'object',
   Nm = (e) => e === !0 || e === !1,
   Bs = (e) => {
      if (Ar(e) !== 'object') return !1
      const t = ci(e)
      return (
         (t === null ||
            t === Object.prototype ||
            Object.getPrototypeOf(t) === null) &&
         !(Symbol.toStringTag in e) &&
         !(Symbol.iterator in e)
      )
   },
   xm = gt('Date'),
   Rm = gt('File'),
   Pm = gt('Blob'),
   km = gt('FileList'),
   Dm = (e) => Or(e) && qe(e.pipe),
   $m = (e) => {
      let t
      return (
         e &&
         ((typeof FormData == 'function' && e instanceof FormData) ||
            (qe(e.append) &&
               ((t = Ar(e)) === 'formdata' ||
                  (t === 'object' &&
                     qe(e.toString) &&
                     e.toString() === '[object FormData]'))))
      )
   },
   Lm = gt('URLSearchParams'),
   Im = (e) =>
      e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
function _s(e, t, { allOwnKeys: n = !1 } = {}) {
   if (e === null || typeof e > 'u') return
   let s, r
   if ((typeof e != 'object' && (e = [e]), Bn(e)))
      for (s = 0, r = e.length; s < r; s++) t.call(null, e[s], s, e)
   else {
      const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
         i = o.length
      let a
      for (s = 0; s < i; s++) (a = o[s]), t.call(null, e[a], a, e)
   }
}
function Vc(e, t) {
   t = t.toLowerCase()
   const n = Object.keys(e)
   let s = n.length,
      r
   for (; s-- > 0; ) if (((r = n[s]), t === r.toLowerCase())) return r
   return null
}
const Bc = (() =>
      typeof globalThis < 'u'
         ? globalThis
         : typeof self < 'u'
         ? self
         : typeof window < 'u'
         ? window
         : global)(),
   jc = (e) => !hs(e) && e !== Bc
function Ro() {
   const { caseless: e } = (jc(this) && this) || {},
      t = {},
      n = (s, r) => {
         const o = (e && Vc(t, r)) || r
         Bs(t[o]) && Bs(s)
            ? (t[o] = Ro(t[o], s))
            : Bs(s)
            ? (t[o] = Ro({}, s))
            : Bn(s)
            ? (t[o] = s.slice())
            : (t[o] = s)
      }
   for (let s = 0, r = arguments.length; s < r; s++)
      arguments[s] && _s(arguments[s], n)
   return t
}
const Mm = (e, t, n, { allOwnKeys: s } = {}) => (
      _s(
         t,
         (r, o) => {
            n && qe(r) ? (e[o] = Hc(r, n)) : (e[o] = r)
         },
         { allOwnKeys: s }
      ),
      e
   ),
   Hm = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
   Fm = (e, t, n, s) => {
      ;(e.prototype = Object.create(t.prototype, s)),
         (e.prototype.constructor = e),
         Object.defineProperty(e, 'super', { value: t.prototype }),
         n && Object.assign(e.prototype, n)
   },
   Wm = (e, t, n, s) => {
      let r, o, i
      const a = {}
      if (((t = t || {}), e == null)) return t
      do {
         for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
            (i = r[o]),
               (!s || s(i, e, t)) && !a[i] && ((t[i] = e[i]), (a[i] = !0))
         e = n !== !1 && ci(e)
      } while (e && (!n || n(e, t)) && e !== Object.prototype)
      return t
   },
   Vm = (e, t, n) => {
      ;(e = String(e)),
         (n === void 0 || n > e.length) && (n = e.length),
         (n -= t.length)
      const s = e.indexOf(t, n)
      return s !== -1 && s === n
   },
   Bm = (e) => {
      if (!e) return null
      if (Bn(e)) return e
      let t = e.length
      if (!Wc(t)) return null
      const n = new Array(t)
      for (; t-- > 0; ) n[t] = e[t]
      return n
   },
   jm = (
      (e) => (t) =>
         e && t instanceof e
   )(typeof Uint8Array < 'u' && ci(Uint8Array)),
   Um = (e, t) => {
      const s = (e && e[Symbol.iterator]).call(e)
      let r
      for (; (r = s.next()) && !r.done; ) {
         const o = r.value
         t.call(e, o[0], o[1])
      }
   },
   Km = (e, t) => {
      let n
      const s = []
      for (; (n = e.exec(t)) !== null; ) s.push(n)
      return s
   },
   zm = gt('HTMLFormElement'),
   qm = (e) =>
      e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, s, r) {
         return s.toUpperCase() + r
      }),
   $a = (
      ({ hasOwnProperty: e }) =>
      (t, n) =>
         e.call(t, n)
   )(Object.prototype),
   Ym = gt('RegExp'),
   Uc = (e, t) => {
      const n = Object.getOwnPropertyDescriptors(e),
         s = {}
      _s(n, (r, o) => {
         let i
         ;(i = t(r, o, e)) !== !1 && (s[o] = i || r)
      }),
         Object.defineProperties(e, s)
   },
   Gm = (e) => {
      Uc(e, (t, n) => {
         if (qe(e) && ['arguments', 'caller', 'callee'].indexOf(n) !== -1)
            return !1
         const s = e[n]
         if (qe(s)) {
            if (((t.enumerable = !1), 'writable' in t)) {
               t.writable = !1
               return
            }
            t.set ||
               (t.set = () => {
                  throw Error("Can not rewrite read-only method '" + n + "'")
               })
         }
      })
   },
   Jm = (e, t) => {
      const n = {},
         s = (r) => {
            r.forEach((o) => {
               n[o] = !0
            })
         }
      return Bn(e) ? s(e) : s(String(e).split(t)), n
   },
   Xm = () => {},
   Qm = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
   qr = 'abcdefghijklmnopqrstuvwxyz',
   La = '0123456789',
   Kc = { DIGIT: La, ALPHA: qr, ALPHA_DIGIT: qr + qr.toUpperCase() + La },
   Zm = (e = 16, t = Kc.ALPHA_DIGIT) => {
      let n = ''
      const { length: s } = t
      for (; e--; ) n += t[(Math.random() * s) | 0]
      return n
   }
function e_(e) {
   return !!(
      e &&
      qe(e.append) &&
      e[Symbol.toStringTag] === 'FormData' &&
      e[Symbol.iterator]
   )
}
const t_ = (e) => {
      const t = new Array(10),
         n = (s, r) => {
            if (Or(s)) {
               if (t.indexOf(s) >= 0) return
               if (!('toJSON' in s)) {
                  t[r] = s
                  const o = Bn(s) ? [] : {}
                  return (
                     _s(s, (i, a) => {
                        const l = n(i, r + 1)
                        !hs(l) && (o[a] = l)
                     }),
                     (t[r] = void 0),
                     o
                  )
               }
            }
            return s
         }
      return n(e, 0)
   },
   n_ = gt('AsyncFunction'),
   s_ = (e) => e && (Or(e) || qe(e)) && qe(e.then) && qe(e.catch),
   y = {
      isArray: Bn,
      isArrayBuffer: Fc,
      isBuffer: Sm,
      isFormData: $m,
      isArrayBufferView: Om,
      isString: Cm,
      isNumber: Wc,
      isBoolean: Nm,
      isObject: Or,
      isPlainObject: Bs,
      isUndefined: hs,
      isDate: xm,
      isFile: Rm,
      isBlob: Pm,
      isRegExp: Ym,
      isFunction: qe,
      isStream: Dm,
      isURLSearchParams: Lm,
      isTypedArray: jm,
      isFileList: km,
      forEach: _s,
      merge: Ro,
      extend: Mm,
      trim: Im,
      stripBOM: Hm,
      inherits: Fm,
      toFlatObject: Wm,
      kindOf: Ar,
      kindOfTest: gt,
      endsWith: Vm,
      toArray: Bm,
      forEachEntry: Um,
      matchAll: Km,
      isHTMLForm: zm,
      hasOwnProperty: $a,
      hasOwnProp: $a,
      reduceDescriptors: Uc,
      freezeMethods: Gm,
      toObjectSet: Jm,
      toCamelCase: qm,
      noop: Xm,
      toFiniteNumber: Qm,
      findKey: Vc,
      global: Bc,
      isContextDefined: jc,
      ALPHABET: Kc,
      generateString: Zm,
      isSpecCompliantForm: e_,
      toJSONObject: t_,
      isAsyncFn: n_,
      isThenable: s_,
   }
function X(e, t, n, s, r) {
   Error.call(this),
      Error.captureStackTrace
         ? Error.captureStackTrace(this, this.constructor)
         : (this.stack = new Error().stack),
      (this.message = e),
      (this.name = 'AxiosError'),
      t && (this.code = t),
      n && (this.config = n),
      s && (this.request = s),
      r && (this.response = r)
}
y.inherits(X, Error, {
   toJSON: function () {
      return {
         message: this.message,
         name: this.name,
         description: this.description,
         number: this.number,
         fileName: this.fileName,
         lineNumber: this.lineNumber,
         columnNumber: this.columnNumber,
         stack: this.stack,
         config: y.toJSONObject(this.config),
         code: this.code,
         status:
            this.response && this.response.status ? this.response.status : null,
      }
   },
})
const zc = X.prototype,
   qc = {}
;[
   'ERR_BAD_OPTION_VALUE',
   'ERR_BAD_OPTION',
   'ECONNABORTED',
   'ETIMEDOUT',
   'ERR_NETWORK',
   'ERR_FR_TOO_MANY_REDIRECTS',
   'ERR_DEPRECATED',
   'ERR_BAD_RESPONSE',
   'ERR_BAD_REQUEST',
   'ERR_CANCELED',
   'ERR_NOT_SUPPORT',
   'ERR_INVALID_URL',
].forEach((e) => {
   qc[e] = { value: e }
})
Object.defineProperties(X, qc)
Object.defineProperty(zc, 'isAxiosError', { value: !0 })
X.from = (e, t, n, s, r, o) => {
   const i = Object.create(zc)
   return (
      y.toFlatObject(
         e,
         i,
         function (l) {
            return l !== Error.prototype
         },
         (a) => a !== 'isAxiosError'
      ),
      X.call(i, e.message, t, n, s, r),
      (i.cause = e),
      (i.name = e.name),
      o && Object.assign(i, o),
      i
   )
}
const r_ = null
function Po(e) {
   return y.isPlainObject(e) || y.isArray(e)
}
function Yc(e) {
   return y.endsWith(e, '[]') ? e.slice(0, -2) : e
}
function Ia(e, t, n) {
   return e
      ? e
           .concat(t)
           .map(function (r, o) {
              return (r = Yc(r)), !n && o ? '[' + r + ']' : r
           })
           .join(n ? '.' : '')
      : t
}
function o_(e) {
   return y.isArray(e) && !e.some(Po)
}
const i_ = y.toFlatObject(y, {}, null, function (t) {
   return /^is[A-Z]/.test(t)
})
function Cr(e, t, n) {
   if (!y.isObject(e)) throw new TypeError('target must be an object')
   ;(t = t || new FormData()),
      (n = y.toFlatObject(
         n,
         { metaTokens: !0, dots: !1, indexes: !1 },
         !1,
         function (E, O) {
            return !y.isUndefined(O[E])
         }
      ))
   const s = n.metaTokens,
      r = n.visitor || c,
      o = n.dots,
      i = n.indexes,
      l = (n.Blob || (typeof Blob < 'u' && Blob)) && y.isSpecCompliantForm(t)
   if (!y.isFunction(r)) throw new TypeError('visitor must be a function')
   function u(g) {
      if (g === null) return ''
      if (y.isDate(g)) return g.toISOString()
      if (!l && y.isBlob(g))
         throw new X('Blob is not supported. Use a Buffer instead.')
      return y.isArrayBuffer(g) || y.isTypedArray(g)
         ? l && typeof Blob == 'function'
            ? new Blob([g])
            : Buffer.from(g)
         : g
   }
   function c(g, E, O) {
      let N = g
      if (g && !O && typeof g == 'object') {
         if (y.endsWith(E, '{}'))
            (E = s ? E : E.slice(0, -2)), (g = JSON.stringify(g))
         else if (
            (y.isArray(g) && o_(g)) ||
            ((y.isFileList(g) || y.endsWith(E, '[]')) && (N = y.toArray(g)))
         )
            return (
               (E = Yc(E)),
               N.forEach(function (M, C) {
                  !(y.isUndefined(M) || M === null) &&
                     t.append(
                        i === !0 ? Ia([E], C, o) : i === null ? E : E + '[]',
                        u(M)
                     )
               }),
               !1
            )
      }
      return Po(g) ? !0 : (t.append(Ia(O, E, o), u(g)), !1)
   }
   const d = [],
      p = Object.assign(i_, {
         defaultVisitor: c,
         convertValue: u,
         isVisitable: Po,
      })
   function _(g, E) {
      if (!y.isUndefined(g)) {
         if (d.indexOf(g) !== -1)
            throw Error('Circular reference detected in ' + E.join('.'))
         d.push(g),
            y.forEach(g, function (N, P) {
               ;(!(y.isUndefined(N) || N === null) &&
                  r.call(t, N, y.isString(P) ? P.trim() : P, E, p)) === !0 &&
                  _(N, E ? E.concat(P) : [P])
            }),
            d.pop()
      }
   }
   if (!y.isObject(e)) throw new TypeError('data must be an object')
   return _(e), t
}
function Ma(e) {
   const t = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\0',
   }
   return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (s) {
      return t[s]
   })
}
function ui(e, t) {
   ;(this._pairs = []), e && Cr(e, this, t)
}
const Gc = ui.prototype
Gc.append = function (t, n) {
   this._pairs.push([t, n])
}
Gc.toString = function (t) {
   const n = t
      ? function (s) {
           return t.call(this, s, Ma)
        }
      : Ma
   return this._pairs
      .map(function (r) {
         return n(r[0]) + '=' + n(r[1])
      }, '')
      .join('&')
}
function a_(e) {
   return encodeURIComponent(e)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']')
}
function Jc(e, t, n) {
   if (!t) return e
   const s = (n && n.encode) || a_,
      r = n && n.serialize
   let o
   if (
      (r
         ? (o = r(t, n))
         : (o = y.isURLSearchParams(t)
              ? t.toString()
              : new ui(t, n).toString(s)),
      o)
   ) {
      const i = e.indexOf('#')
      i !== -1 && (e = e.slice(0, i)),
         (e += (e.indexOf('?') === -1 ? '?' : '&') + o)
   }
   return e
}
class l_ {
   constructor() {
      this.handlers = []
   }
   use(t, n, s) {
      return (
         this.handlers.push({
            fulfilled: t,
            rejected: n,
            synchronous: s ? s.synchronous : !1,
            runWhen: s ? s.runWhen : null,
         }),
         this.handlers.length - 1
      )
   }
   eject(t) {
      this.handlers[t] && (this.handlers[t] = null)
   }
   clear() {
      this.handlers && (this.handlers = [])
   }
   forEach(t) {
      y.forEach(this.handlers, function (s) {
         s !== null && t(s)
      })
   }
}
const Ha = l_,
   Xc = {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1,
   },
   c_ = typeof URLSearchParams < 'u' ? URLSearchParams : ui,
   u_ = typeof FormData < 'u' ? FormData : null,
   f_ = typeof Blob < 'u' ? Blob : null,
   d_ = {
      isBrowser: !0,
      classes: { URLSearchParams: c_, FormData: u_, Blob: f_ },
      protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
   },
   Qc = typeof window < 'u' && typeof document < 'u',
   h_ = ((e) => Qc && ['ReactNative', 'NativeScript', 'NS'].indexOf(e) < 0)(
      typeof navigator < 'u' && navigator.product
   ),
   p_ = (() =>
      typeof WorkerGlobalScope < 'u' &&
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts == 'function')(),
   m_ = Object.freeze(
      Object.defineProperty(
         {
            __proto__: null,
            hasBrowserEnv: Qc,
            hasStandardBrowserEnv: h_,
            hasStandardBrowserWebWorkerEnv: p_,
         },
         Symbol.toStringTag,
         { value: 'Module' }
      )
   ),
   dt = { ...m_, ...d_ }
function __(e, t) {
   return Cr(
      e,
      new dt.classes.URLSearchParams(),
      Object.assign(
         {
            visitor: function (n, s, r, o) {
               return dt.isNode && y.isBuffer(n)
                  ? (this.append(s, n.toString('base64')), !1)
                  : o.defaultVisitor.apply(this, arguments)
            },
         },
         t
      )
   )
}
function g_(e) {
   return y
      .matchAll(/\w+|\[(\w*)]/g, e)
      .map((t) => (t[0] === '[]' ? '' : t[1] || t[0]))
}
function E_(e) {
   const t = {},
      n = Object.keys(e)
   let s
   const r = n.length
   let o
   for (s = 0; s < r; s++) (o = n[s]), (t[o] = e[o])
   return t
}
function Zc(e) {
   function t(n, s, r, o) {
      let i = n[o++]
      const a = Number.isFinite(+i),
         l = o >= n.length
      return (
         (i = !i && y.isArray(r) ? r.length : i),
         l
            ? (y.hasOwnProp(r, i) ? (r[i] = [r[i], s]) : (r[i] = s), !a)
            : ((!r[i] || !y.isObject(r[i])) && (r[i] = []),
              t(n, s, r[i], o) && y.isArray(r[i]) && (r[i] = E_(r[i])),
              !a)
      )
   }
   if (y.isFormData(e) && y.isFunction(e.entries)) {
      const n = {}
      return (
         y.forEachEntry(e, (s, r) => {
            t(g_(s), r, n, 0)
         }),
         n
      )
   }
   return null
}
function v_(e, t, n) {
   if (y.isString(e))
      try {
         return (t || JSON.parse)(e), y.trim(e)
      } catch (s) {
         if (s.name !== 'SyntaxError') throw s
      }
   return (n || JSON.stringify)(e)
}
const fi = {
   transitional: Xc,
   adapter: ['xhr', 'http'],
   transformRequest: [
      function (t, n) {
         const s = n.getContentType() || '',
            r = s.indexOf('application/json') > -1,
            o = y.isObject(t)
         if ((o && y.isHTMLForm(t) && (t = new FormData(t)), y.isFormData(t)))
            return r && r ? JSON.stringify(Zc(t)) : t
         if (
            y.isArrayBuffer(t) ||
            y.isBuffer(t) ||
            y.isStream(t) ||
            y.isFile(t) ||
            y.isBlob(t)
         )
            return t
         if (y.isArrayBufferView(t)) return t.buffer
         if (y.isURLSearchParams(t))
            return (
               n.setContentType(
                  'application/x-www-form-urlencoded;charset=utf-8',
                  !1
               ),
               t.toString()
            )
         let a
         if (o) {
            if (s.indexOf('application/x-www-form-urlencoded') > -1)
               return __(t, this.formSerializer).toString()
            if (
               (a = y.isFileList(t)) ||
               s.indexOf('multipart/form-data') > -1
            ) {
               const l = this.env && this.env.FormData
               return Cr(
                  a ? { 'files[]': t } : t,
                  l && new l(),
                  this.formSerializer
               )
            }
         }
         return o || r ? (n.setContentType('application/json', !1), v_(t)) : t
      },
   ],
   transformResponse: [
      function (t) {
         const n = this.transitional || fi.transitional,
            s = n && n.forcedJSONParsing,
            r = this.responseType === 'json'
         if (t && y.isString(t) && ((s && !this.responseType) || r)) {
            const i = !(n && n.silentJSONParsing) && r
            try {
               return JSON.parse(t)
            } catch (a) {
               if (i)
                  throw a.name === 'SyntaxError'
                     ? X.from(a, X.ERR_BAD_RESPONSE, this, null, this.response)
                     : a
            }
         }
         return t
      },
   ],
   timeout: 0,
   xsrfCookieName: 'XSRF-TOKEN',
   xsrfHeaderName: 'X-XSRF-TOKEN',
   maxContentLength: -1,
   maxBodyLength: -1,
   env: { FormData: dt.classes.FormData, Blob: dt.classes.Blob },
   validateStatus: function (t) {
      return t >= 200 && t < 300
   },
   headers: {
      common: {
         Accept: 'application/json, text/plain, */*',
         'Content-Type': void 0,
      },
   },
}
y.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (e) => {
   fi.headers[e] = {}
})
const di = fi,
   b_ = y.toObjectSet([
      'age',
      'authorization',
      'content-length',
      'content-type',
      'etag',
      'expires',
      'from',
      'host',
      'if-modified-since',
      'if-unmodified-since',
      'last-modified',
      'location',
      'max-forwards',
      'proxy-authorization',
      'referer',
      'retry-after',
      'user-agent',
   ]),
   y_ = (e) => {
      const t = {}
      let n, s, r
      return (
         e &&
            e
               .split(
                  `
`
               )
               .forEach(function (i) {
                  ;(r = i.indexOf(':')),
                     (n = i.substring(0, r).trim().toLowerCase()),
                     (s = i.substring(r + 1).trim()),
                     !(!n || (t[n] && b_[n])) &&
                        (n === 'set-cookie'
                           ? t[n]
                              ? t[n].push(s)
                              : (t[n] = [s])
                           : (t[n] = t[n] ? t[n] + ', ' + s : s))
               }),
         t
      )
   },
   Fa = Symbol('internals')
function Jn(e) {
   return e && String(e).trim().toLowerCase()
}
function js(e) {
   return e === !1 || e == null ? e : y.isArray(e) ? e.map(js) : String(e)
}
function w_(e) {
   const t = Object.create(null),
      n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g
   let s
   for (; (s = n.exec(e)); ) t[s[1]] = s[2]
   return t
}
const T_ = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())
function Yr(e, t, n, s, r) {
   if (y.isFunction(s)) return s.call(this, t, n)
   if ((r && (t = n), !!y.isString(t))) {
      if (y.isString(s)) return t.indexOf(s) !== -1
      if (y.isRegExp(s)) return s.test(t)
   }
}
function A_(e) {
   return e
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s)
}
function S_(e, t) {
   const n = y.toCamelCase(' ' + t)
   ;['get', 'set', 'has'].forEach((s) => {
      Object.defineProperty(e, s + n, {
         value: function (r, o, i) {
            return this[s].call(this, t, r, o, i)
         },
         configurable: !0,
      })
   })
}
class Nr {
   constructor(t) {
      t && this.set(t)
   }
   set(t, n, s) {
      const r = this
      function o(a, l, u) {
         const c = Jn(l)
         if (!c) throw new Error('header name must be a non-empty string')
         const d = y.findKey(r, c)
         ;(!d ||
            r[d] === void 0 ||
            u === !0 ||
            (u === void 0 && r[d] !== !1)) &&
            (r[d || l] = js(a))
      }
      const i = (a, l) => y.forEach(a, (u, c) => o(u, c, l))
      return (
         y.isPlainObject(t) || t instanceof this.constructor
            ? i(t, n)
            : y.isString(t) && (t = t.trim()) && !T_(t)
            ? i(y_(t), n)
            : t != null && o(n, t, s),
         this
      )
   }
   get(t, n) {
      if (((t = Jn(t)), t)) {
         const s = y.findKey(this, t)
         if (s) {
            const r = this[s]
            if (!n) return r
            if (n === !0) return w_(r)
            if (y.isFunction(n)) return n.call(this, r, s)
            if (y.isRegExp(n)) return n.exec(r)
            throw new TypeError('parser must be boolean|regexp|function')
         }
      }
   }
   has(t, n) {
      if (((t = Jn(t)), t)) {
         const s = y.findKey(this, t)
         return !!(s && this[s] !== void 0 && (!n || Yr(this, this[s], s, n)))
      }
      return !1
   }
   delete(t, n) {
      const s = this
      let r = !1
      function o(i) {
         if (((i = Jn(i)), i)) {
            const a = y.findKey(s, i)
            a && (!n || Yr(s, s[a], a, n)) && (delete s[a], (r = !0))
         }
      }
      return y.isArray(t) ? t.forEach(o) : o(t), r
   }
   clear(t) {
      const n = Object.keys(this)
      let s = n.length,
         r = !1
      for (; s--; ) {
         const o = n[s]
         ;(!t || Yr(this, this[o], o, t, !0)) && (delete this[o], (r = !0))
      }
      return r
   }
   normalize(t) {
      const n = this,
         s = {}
      return (
         y.forEach(this, (r, o) => {
            const i = y.findKey(s, o)
            if (i) {
               ;(n[i] = js(r)), delete n[o]
               return
            }
            const a = t ? A_(o) : String(o).trim()
            a !== o && delete n[o], (n[a] = js(r)), (s[a] = !0)
         }),
         this
      )
   }
   concat(...t) {
      return this.constructor.concat(this, ...t)
   }
   toJSON(t) {
      const n = Object.create(null)
      return (
         y.forEach(this, (s, r) => {
            s != null &&
               s !== !1 &&
               (n[r] = t && y.isArray(s) ? s.join(', ') : s)
         }),
         n
      )
   }
   [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]()
   }
   toString() {
      return Object.entries(this.toJSON()).map(([t, n]) => t + ': ' + n).join(`
`)
   }
   get [Symbol.toStringTag]() {
      return 'AxiosHeaders'
   }
   static from(t) {
      return t instanceof this ? t : new this(t)
   }
   static concat(t, ...n) {
      const s = new this(t)
      return n.forEach((r) => s.set(r)), s
   }
   static accessor(t) {
      const s = (this[Fa] = this[Fa] = { accessors: {} }).accessors,
         r = this.prototype
      function o(i) {
         const a = Jn(i)
         s[a] || (S_(r, i), (s[a] = !0))
      }
      return y.isArray(t) ? t.forEach(o) : o(t), this
   }
}
Nr.accessor([
   'Content-Type',
   'Content-Length',
   'Accept',
   'Accept-Encoding',
   'User-Agent',
   'Authorization',
])
y.reduceDescriptors(Nr.prototype, ({ value: e }, t) => {
   let n = t[0].toUpperCase() + t.slice(1)
   return {
      get: () => e,
      set(s) {
         this[n] = s
      },
   }
})
y.freezeMethods(Nr)
const At = Nr
function Gr(e, t) {
   const n = this || di,
      s = t || n,
      r = At.from(s.headers)
   let o = s.data
   return (
      y.forEach(e, function (a) {
         o = a.call(n, o, r.normalize(), t ? t.status : void 0)
      }),
      r.normalize(),
      o
   )
}
function eu(e) {
   return !!(e && e.__CANCEL__)
}
function gs(e, t, n) {
   X.call(this, e ?? 'canceled', X.ERR_CANCELED, t, n),
      (this.name = 'CanceledError')
}
y.inherits(gs, X, { __CANCEL__: !0 })
function O_(e, t, n) {
   const s = n.config.validateStatus
   !n.status || !s || s(n.status)
      ? e(n)
      : t(
           new X(
              'Request failed with status code ' + n.status,
              [X.ERR_BAD_REQUEST, X.ERR_BAD_RESPONSE][
                 Math.floor(n.status / 100) - 4
              ],
              n.config,
              n.request,
              n
           )
        )
}
const C_ = dt.hasStandardBrowserEnv
   ? (function () {
        return {
           write: function (n, s, r, o, i, a) {
              const l = []
              l.push(n + '=' + encodeURIComponent(s)),
                 y.isNumber(r) &&
                    l.push('expires=' + new Date(r).toGMTString()),
                 y.isString(o) && l.push('path=' + o),
                 y.isString(i) && l.push('domain=' + i),
                 a === !0 && l.push('secure'),
                 (document.cookie = l.join('; '))
           },
           read: function (n) {
              const s = document.cookie.match(
                 new RegExp('(^|;\\s*)(' + n + ')=([^;]*)')
              )
              return s ? decodeURIComponent(s[3]) : null
           },
           remove: function (n) {
              this.write(n, '', Date.now() - 864e5)
           },
        }
     })()
   : (function () {
        return {
           write: function () {},
           read: function () {
              return null
           },
           remove: function () {},
        }
     })()
function N_(e) {
   return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
}
function x_(e, t) {
   return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e
}
function tu(e, t) {
   return e && !N_(t) ? x_(e, t) : t
}
const R_ = dt.hasStandardBrowserEnv
   ? (function () {
        const t = /(msie|trident)/i.test(navigator.userAgent),
           n = document.createElement('a')
        let s
        function r(o) {
           let i = o
           return (
              t && (n.setAttribute('href', i), (i = n.href)),
              n.setAttribute('href', i),
              {
                 href: n.href,
                 protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
                 host: n.host,
                 search: n.search ? n.search.replace(/^\?/, '') : '',
                 hash: n.hash ? n.hash.replace(/^#/, '') : '',
                 hostname: n.hostname,
                 port: n.port,
                 pathname:
                    n.pathname.charAt(0) === '/'
                       ? n.pathname
                       : '/' + n.pathname,
              }
           )
        }
        return (
           (s = r(window.location.href)),
           function (i) {
              const a = y.isString(i) ? r(i) : i
              return a.protocol === s.protocol && a.host === s.host
           }
        )
     })()
   : (function () {
        return function () {
           return !0
        }
     })()
function P_(e) {
   const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e)
   return (t && t[1]) || ''
}
function k_(e, t) {
   e = e || 10
   const n = new Array(e),
      s = new Array(e)
   let r = 0,
      o = 0,
      i
   return (
      (t = t !== void 0 ? t : 1e3),
      function (l) {
         const u = Date.now(),
            c = s[o]
         i || (i = u), (n[r] = l), (s[r] = u)
         let d = o,
            p = 0
         for (; d !== r; ) (p += n[d++]), (d = d % e)
         if (((r = (r + 1) % e), r === o && (o = (o + 1) % e), u - i < t))
            return
         const _ = c && u - c
         return _ ? Math.round((p * 1e3) / _) : void 0
      }
   )
}
function Wa(e, t) {
   let n = 0
   const s = k_(50, 250)
   return (r) => {
      const o = r.loaded,
         i = r.lengthComputable ? r.total : void 0,
         a = o - n,
         l = s(a),
         u = o <= i
      n = o
      const c = {
         loaded: o,
         total: i,
         progress: i ? o / i : void 0,
         bytes: a,
         rate: l || void 0,
         estimated: l && i && u ? (i - o) / l : void 0,
         event: r,
      }
      ;(c[t ? 'download' : 'upload'] = !0), e(c)
   }
}
const D_ = typeof XMLHttpRequest < 'u',
   $_ =
      D_ &&
      function (e) {
         return new Promise(function (n, s) {
            let r = e.data
            const o = At.from(e.headers).normalize(),
               i = e.responseType
            let a
            function l() {
               e.cancelToken && e.cancelToken.unsubscribe(a),
                  e.signal && e.signal.removeEventListener('abort', a)
            }
            let u
            if (y.isFormData(r)) {
               if (
                  dt.hasStandardBrowserEnv ||
                  dt.hasStandardBrowserWebWorkerEnv
               )
                  o.setContentType(!1)
               else if ((u = o.getContentType()) !== !1) {
                  const [g, ...E] = u
                     ? u
                          .split(';')
                          .map((O) => O.trim())
                          .filter(Boolean)
                     : []
                  o.setContentType(
                     [g || 'multipart/form-data', ...E].join('; ')
                  )
               }
            }
            let c = new XMLHttpRequest()
            if (e.auth) {
               const g = e.auth.username || '',
                  E = e.auth.password
                     ? unescape(encodeURIComponent(e.auth.password))
                     : ''
               o.set('Authorization', 'Basic ' + btoa(g + ':' + E))
            }
            const d = tu(e.baseURL, e.url)
            c.open(
               e.method.toUpperCase(),
               Jc(d, e.params, e.paramsSerializer),
               !0
            ),
               (c.timeout = e.timeout)
            function p() {
               if (!c) return
               const g = At.from(
                     'getAllResponseHeaders' in c && c.getAllResponseHeaders()
                  ),
                  O = {
                     data:
                        !i || i === 'text' || i === 'json'
                           ? c.responseText
                           : c.response,
                     status: c.status,
                     statusText: c.statusText,
                     headers: g,
                     config: e,
                     request: c,
                  }
               O_(
                  function (P) {
                     n(P), l()
                  },
                  function (P) {
                     s(P), l()
                  },
                  O
               ),
                  (c = null)
            }
            if (
               ('onloadend' in c
                  ? (c.onloadend = p)
                  : (c.onreadystatechange = function () {
                       !c ||
                          c.readyState !== 4 ||
                          (c.status === 0 &&
                             !(
                                c.responseURL &&
                                c.responseURL.indexOf('file:') === 0
                             )) ||
                          setTimeout(p)
                    }),
               (c.onabort = function () {
                  c &&
                     (s(new X('Request aborted', X.ECONNABORTED, e, c)),
                     (c = null))
               }),
               (c.onerror = function () {
                  s(new X('Network Error', X.ERR_NETWORK, e, c)), (c = null)
               }),
               (c.ontimeout = function () {
                  let E = e.timeout
                     ? 'timeout of ' + e.timeout + 'ms exceeded'
                     : 'timeout exceeded'
                  const O = e.transitional || Xc
                  e.timeoutErrorMessage && (E = e.timeoutErrorMessage),
                     s(
                        new X(
                           E,
                           O.clarifyTimeoutError ? X.ETIMEDOUT : X.ECONNABORTED,
                           e,
                           c
                        )
                     ),
                     (c = null)
               }),
               dt.hasStandardBrowserEnv)
            ) {
               const g = R_(d) && e.xsrfCookieName && C_.read(e.xsrfCookieName)
               g && o.set(e.xsrfHeaderName, g)
            }
            r === void 0 && o.setContentType(null),
               'setRequestHeader' in c &&
                  y.forEach(o.toJSON(), function (E, O) {
                     c.setRequestHeader(O, E)
                  }),
               y.isUndefined(e.withCredentials) ||
                  (c.withCredentials = !!e.withCredentials),
               i && i !== 'json' && (c.responseType = e.responseType),
               typeof e.onDownloadProgress == 'function' &&
                  c.addEventListener('progress', Wa(e.onDownloadProgress, !0)),
               typeof e.onUploadProgress == 'function' &&
                  c.upload &&
                  c.upload.addEventListener('progress', Wa(e.onUploadProgress)),
               (e.cancelToken || e.signal) &&
                  ((a = (g) => {
                     c &&
                        (s(!g || g.type ? new gs(null, e, c) : g),
                        c.abort(),
                        (c = null))
                  }),
                  e.cancelToken && e.cancelToken.subscribe(a),
                  e.signal &&
                     (e.signal.aborted
                        ? a()
                        : e.signal.addEventListener('abort', a)))
            const _ = P_(d)
            if (_ && dt.protocols.indexOf(_) === -1) {
               s(new X('Unsupported protocol ' + _ + ':', X.ERR_BAD_REQUEST, e))
               return
            }
            c.send(r || null)
         })
      },
   ko = { http: r_, xhr: $_ }
y.forEach(ko, (e, t) => {
   if (e) {
      try {
         Object.defineProperty(e, 'name', { value: t })
      } catch {}
      Object.defineProperty(e, 'adapterName', { value: t })
   }
})
const Va = (e) => `- ${e}`,
   L_ = (e) => y.isFunction(e) || e === null || e === !1,
   nu = {
      getAdapter: (e) => {
         e = y.isArray(e) ? e : [e]
         const { length: t } = e
         let n, s
         const r = {}
         for (let o = 0; o < t; o++) {
            n = e[o]
            let i
            if (
               ((s = n),
               !L_(n) &&
                  ((s = ko[(i = String(n)).toLowerCase()]), s === void 0))
            )
               throw new X(`Unknown adapter '${i}'`)
            if (s) break
            r[i || '#' + o] = s
         }
         if (!s) {
            const o = Object.entries(r).map(
               ([a, l]) =>
                  `adapter ${a} ` +
                  (l === !1
                     ? 'is not supported by the environment'
                     : 'is not available in the build')
            )
            let i = t
               ? o.length > 1
                  ? `since :
` +
                    o.map(Va).join(`
`)
                  : ' ' + Va(o[0])
               : 'as no adapter specified'
            throw new X(
               'There is no suitable adapter to dispatch the request ' + i,
               'ERR_NOT_SUPPORT'
            )
         }
         return s
      },
      adapters: ko,
   }
function Jr(e) {
   if (
      (e.cancelToken && e.cancelToken.throwIfRequested(),
      e.signal && e.signal.aborted)
   )
      throw new gs(null, e)
}
function Ba(e) {
   return (
      Jr(e),
      (e.headers = At.from(e.headers)),
      (e.data = Gr.call(e, e.transformRequest)),
      ['post', 'put', 'patch'].indexOf(e.method) !== -1 &&
         e.headers.setContentType('application/x-www-form-urlencoded', !1),
      nu
         .getAdapter(e.adapter || di.adapter)(e)
         .then(
            function (s) {
               return (
                  Jr(e),
                  (s.data = Gr.call(e, e.transformResponse, s)),
                  (s.headers = At.from(s.headers)),
                  s
               )
            },
            function (s) {
               return (
                  eu(s) ||
                     (Jr(e),
                     s &&
                        s.response &&
                        ((s.response.data = Gr.call(
                           e,
                           e.transformResponse,
                           s.response
                        )),
                        (s.response.headers = At.from(s.response.headers)))),
                  Promise.reject(s)
               )
            }
         )
   )
}
const ja = (e) => (e instanceof At ? e.toJSON() : e)
function Pn(e, t) {
   t = t || {}
   const n = {}
   function s(u, c, d) {
      return y.isPlainObject(u) && y.isPlainObject(c)
         ? y.merge.call({ caseless: d }, u, c)
         : y.isPlainObject(c)
         ? y.merge({}, c)
         : y.isArray(c)
         ? c.slice()
         : c
   }
   function r(u, c, d) {
      if (y.isUndefined(c)) {
         if (!y.isUndefined(u)) return s(void 0, u, d)
      } else return s(u, c, d)
   }
   function o(u, c) {
      if (!y.isUndefined(c)) return s(void 0, c)
   }
   function i(u, c) {
      if (y.isUndefined(c)) {
         if (!y.isUndefined(u)) return s(void 0, u)
      } else return s(void 0, c)
   }
   function a(u, c, d) {
      if (d in t) return s(u, c)
      if (d in e) return s(void 0, u)
   }
   const l = {
      url: o,
      method: o,
      data: o,
      baseURL: i,
      transformRequest: i,
      transformResponse: i,
      paramsSerializer: i,
      timeout: i,
      timeoutMessage: i,
      withCredentials: i,
      adapter: i,
      responseType: i,
      xsrfCookieName: i,
      xsrfHeaderName: i,
      onUploadProgress: i,
      onDownloadProgress: i,
      decompress: i,
      maxContentLength: i,
      maxBodyLength: i,
      beforeRedirect: i,
      transport: i,
      httpAgent: i,
      httpsAgent: i,
      cancelToken: i,
      socketPath: i,
      responseEncoding: i,
      validateStatus: a,
      headers: (u, c) => r(ja(u), ja(c), !0),
   }
   return (
      y.forEach(Object.keys(Object.assign({}, e, t)), function (c) {
         const d = l[c] || r,
            p = d(e[c], t[c], c)
         ;(y.isUndefined(p) && d !== a) || (n[c] = p)
      }),
      n
   )
}
const su = '1.6.1',
   hi = {}
;['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
   (e, t) => {
      hi[e] = function (s) {
         return typeof s === e || 'a' + (t < 1 ? 'n ' : ' ') + e
      }
   }
)
const Ua = {}
hi.transitional = function (t, n, s) {
   function r(o, i) {
      return (
         '[Axios v' +
         su +
         "] Transitional option '" +
         o +
         "'" +
         i +
         (s ? '. ' + s : '')
      )
   }
   return (o, i, a) => {
      if (t === !1)
         throw new X(
            r(i, ' has been removed' + (n ? ' in ' + n : '')),
            X.ERR_DEPRECATED
         )
      return (
         n &&
            !Ua[i] &&
            ((Ua[i] = !0),
            console.warn(
               r(
                  i,
                  ' has been deprecated since v' +
                     n +
                     ' and will be removed in the near future'
               )
            )),
         t ? t(o, i, a) : !0
      )
   }
}
function I_(e, t, n) {
   if (typeof e != 'object')
      throw new X('options must be an object', X.ERR_BAD_OPTION_VALUE)
   const s = Object.keys(e)
   let r = s.length
   for (; r-- > 0; ) {
      const o = s[r],
         i = t[o]
      if (i) {
         const a = e[o],
            l = a === void 0 || i(a, o, e)
         if (l !== !0)
            throw new X('option ' + o + ' must be ' + l, X.ERR_BAD_OPTION_VALUE)
         continue
      }
      if (n !== !0) throw new X('Unknown option ' + o, X.ERR_BAD_OPTION)
   }
}
const Do = { assertOptions: I_, validators: hi },
   kt = Do.validators
class er {
   constructor(t) {
      ;(this.defaults = t),
         (this.interceptors = { request: new Ha(), response: new Ha() })
   }
   request(t, n) {
      typeof t == 'string' ? ((n = n || {}), (n.url = t)) : (n = t || {}),
         (n = Pn(this.defaults, n))
      const { transitional: s, paramsSerializer: r, headers: o } = n
      s !== void 0 &&
         Do.assertOptions(
            s,
            {
               silentJSONParsing: kt.transitional(kt.boolean),
               forcedJSONParsing: kt.transitional(kt.boolean),
               clarifyTimeoutError: kt.transitional(kt.boolean),
            },
            !1
         ),
         r != null &&
            (y.isFunction(r)
               ? (n.paramsSerializer = { serialize: r })
               : Do.assertOptions(
                    r,
                    { encode: kt.function, serialize: kt.function },
                    !0
                 )),
         (n.method = (n.method || this.defaults.method || 'get').toLowerCase())
      let i = o && y.merge(o.common, o[n.method])
      o &&
         y.forEach(
            ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
            (g) => {
               delete o[g]
            }
         ),
         (n.headers = At.concat(i, o))
      const a = []
      let l = !0
      this.interceptors.request.forEach(function (E) {
         ;(typeof E.runWhen == 'function' && E.runWhen(n) === !1) ||
            ((l = l && E.synchronous), a.unshift(E.fulfilled, E.rejected))
      })
      const u = []
      this.interceptors.response.forEach(function (E) {
         u.push(E.fulfilled, E.rejected)
      })
      let c,
         d = 0,
         p
      if (!l) {
         const g = [Ba.bind(this), void 0]
         for (
            g.unshift.apply(g, a),
               g.push.apply(g, u),
               p = g.length,
               c = Promise.resolve(n);
            d < p;

         )
            c = c.then(g[d++], g[d++])
         return c
      }
      p = a.length
      let _ = n
      for (d = 0; d < p; ) {
         const g = a[d++],
            E = a[d++]
         try {
            _ = g(_)
         } catch (O) {
            E.call(this, O)
            break
         }
      }
      try {
         c = Ba.call(this, _)
      } catch (g) {
         return Promise.reject(g)
      }
      for (d = 0, p = u.length; d < p; ) c = c.then(u[d++], u[d++])
      return c
   }
   getUri(t) {
      t = Pn(this.defaults, t)
      const n = tu(t.baseURL, t.url)
      return Jc(n, t.params, t.paramsSerializer)
   }
}
y.forEach(['delete', 'get', 'head', 'options'], function (t) {
   er.prototype[t] = function (n, s) {
      return this.request(
         Pn(s || {}, { method: t, url: n, data: (s || {}).data })
      )
   }
})
y.forEach(['post', 'put', 'patch'], function (t) {
   function n(s) {
      return function (o, i, a) {
         return this.request(
            Pn(a || {}, {
               method: t,
               headers: s ? { 'Content-Type': 'multipart/form-data' } : {},
               url: o,
               data: i,
            })
         )
      }
   }
   ;(er.prototype[t] = n()), (er.prototype[t + 'Form'] = n(!0))
})
const Us = er
class pi {
   constructor(t) {
      if (typeof t != 'function')
         throw new TypeError('executor must be a function.')
      let n
      this.promise = new Promise(function (o) {
         n = o
      })
      const s = this
      this.promise.then((r) => {
         if (!s._listeners) return
         let o = s._listeners.length
         for (; o-- > 0; ) s._listeners[o](r)
         s._listeners = null
      }),
         (this.promise.then = (r) => {
            let o
            const i = new Promise((a) => {
               s.subscribe(a), (o = a)
            }).then(r)
            return (
               (i.cancel = function () {
                  s.unsubscribe(o)
               }),
               i
            )
         }),
         t(function (o, i, a) {
            s.reason || ((s.reason = new gs(o, i, a)), n(s.reason))
         })
   }
   throwIfRequested() {
      if (this.reason) throw this.reason
   }
   subscribe(t) {
      if (this.reason) {
         t(this.reason)
         return
      }
      this._listeners ? this._listeners.push(t) : (this._listeners = [t])
   }
   unsubscribe(t) {
      if (!this._listeners) return
      const n = this._listeners.indexOf(t)
      n !== -1 && this._listeners.splice(n, 1)
   }
   static source() {
      let t
      return {
         token: new pi(function (r) {
            t = r
         }),
         cancel: t,
      }
   }
}
const M_ = pi
function H_(e) {
   return function (n) {
      return e.apply(null, n)
   }
}
function F_(e) {
   return y.isObject(e) && e.isAxiosError === !0
}
const $o = {
   Continue: 100,
   SwitchingProtocols: 101,
   Processing: 102,
   EarlyHints: 103,
   Ok: 200,
   Created: 201,
   Accepted: 202,
   NonAuthoritativeInformation: 203,
   NoContent: 204,
   ResetContent: 205,
   PartialContent: 206,
   MultiStatus: 207,
   AlreadyReported: 208,
   ImUsed: 226,
   MultipleChoices: 300,
   MovedPermanently: 301,
   Found: 302,
   SeeOther: 303,
   NotModified: 304,
   UseProxy: 305,
   Unused: 306,
   TemporaryRedirect: 307,
   PermanentRedirect: 308,
   BadRequest: 400,
   Unauthorized: 401,
   PaymentRequired: 402,
   Forbidden: 403,
   NotFound: 404,
   MethodNotAllowed: 405,
   NotAcceptable: 406,
   ProxyAuthenticationRequired: 407,
   RequestTimeout: 408,
   Conflict: 409,
   Gone: 410,
   LengthRequired: 411,
   PreconditionFailed: 412,
   PayloadTooLarge: 413,
   UriTooLong: 414,
   UnsupportedMediaType: 415,
   RangeNotSatisfiable: 416,
   ExpectationFailed: 417,
   ImATeapot: 418,
   MisdirectedRequest: 421,
   UnprocessableEntity: 422,
   Locked: 423,
   FailedDependency: 424,
   TooEarly: 425,
   UpgradeRequired: 426,
   PreconditionRequired: 428,
   TooManyRequests: 429,
   RequestHeaderFieldsTooLarge: 431,
   UnavailableForLegalReasons: 451,
   InternalServerError: 500,
   NotImplemented: 501,
   BadGateway: 502,
   ServiceUnavailable: 503,
   GatewayTimeout: 504,
   HttpVersionNotSupported: 505,
   VariantAlsoNegotiates: 506,
   InsufficientStorage: 507,
   LoopDetected: 508,
   NotExtended: 510,
   NetworkAuthenticationRequired: 511,
}
Object.entries($o).forEach(([e, t]) => {
   $o[t] = e
})
const W_ = $o
function ru(e) {
   const t = new Us(e),
      n = Hc(Us.prototype.request, t)
   return (
      y.extend(n, Us.prototype, t, { allOwnKeys: !0 }),
      y.extend(n, t, null, { allOwnKeys: !0 }),
      (n.create = function (r) {
         return ru(Pn(e, r))
      }),
      n
   )
}
const Ee = ru(di)
Ee.Axios = Us
Ee.CanceledError = gs
Ee.CancelToken = M_
Ee.isCancel = eu
Ee.VERSION = su
Ee.toFormData = Cr
Ee.AxiosError = X
Ee.Cancel = Ee.CanceledError
Ee.all = function (t) {
   return Promise.all(t)
}
Ee.spread = H_
Ee.isAxiosError = F_
Ee.mergeConfig = Pn
Ee.AxiosHeaders = At
Ee.formToJSON = (e) => Zc(y.isHTMLForm(e) ? new FormData(e) : e)
Ee.getAdapter = nu.getAdapter
Ee.HttpStatusCode = W_
Ee.default = Ee
const V_ = Ee
const B_ = {
      name: 'PeerEvalTable',
      props: { peerEval: Object },
      data() {
         return { rubric: [] }
      },
      methods: {
         submitEvaluation() {
            return 2
         },
         getRubric() {
            var e = []
            for (const t of this.peerEval)
               for (const n of t.ratings) e.push(n.criterion.criterionDesc)
            return e
         },
      },
      computed: {},
      mounted() {
         this.rubric = this.getRubric()
      },
   },
   mi = (e) => (mr('data-v-6c5ddc19'), (e = e()), _r(), e),
   j_ = { onsubmit: 'submitEvaluation' },
   U_ = { class: 'table' },
   K_ = mi(() => D('th', { scope: 'col' }, 'Team member', -1)),
   z_ = { scope: 'col' },
   q_ = mi(() => D('th', null, 'Total', -1)),
   Y_ = { scope: 'col' },
   G_ = { scope: 'col' },
   J_ = ['onUpdate:modelValue'],
   X_ = mi(() => D('button', { type: 'submit' }, 'Submit', -1))
function Q_(e, t, n, s, r, o) {
   return (
      ne(),
      le('form', j_, [
         D('table', U_, [
            D('thead', null, [
               D('tr', null, [
                  K_,
                  (ne(!0),
                  le(
                     be,
                     null,
                     tn(r.rubric, (i) => (ne(), le('th', z_, Be(i), 1))),
                     256
                  )),
                  q_,
               ]),
            ]),
            D('tbody', null, [
               (ne(!0),
               le(
                  be,
                  null,
                  tn(
                     n.peerEval,
                     (i) => (
                        ne(),
                        le('tr', null, [
                           D(
                              'td',
                              Y_,
                              Be(i.evaluateeFirstName + i.evaluateeLastName),
                              1
                           ),
                           (ne(!0),
                           le(
                              be,
                              null,
                              tn(
                                 i.ratings,
                                 (a) => (
                                    ne(),
                                    le('td', G_, [
                                       bt(
                                          D(
                                             'input',
                                             {
                                                type: 'number',
                                                'onUpdate:modelValue': (l) =>
                                                   (a.score = l),
                                                min: '1',
                                                max: '10',
                                             },
                                             null,
                                             8,
                                             J_
                                          ),
                                          [[yt, a.score]]
                                       ),
                                    ])
                                 )
                              ),
                              256
                           )),
                        ])
                     )
                  ),
                  256
               )),
            ]),
         ]),
         X_,
      ])
   )
}
const Z_ = Re(B_, [
   ['render', Q_],
   ['__scopeId', 'data-v-6c5ddc19'],
])
const eg = {
      name: 'StudentPeerEvalView',
      props: {},
      data() {
         return {
            weeks: [
               '2023-09-01 to 2023-09-03',
               '2023-09-04 to 2023-09-10',
               '2023-09-11 to 2023-09-17',
               '2023-09-18 to 2023-09-24',
               '2023-09-25 to 2023-10-01',
               '2023-10-02 to 2023-10-08',
               '2023-10-09 to 2023-10-15',
               '2023-10-16 to 2023-10-22',
               '2023-10-23 to 2023-10-29',
               '2023-10-30 to 2023-11-05',
               '2023-11-06 to 2023-11-12',
               '2023-11-13 to 2023-11-19',
               '2023-11-20 to 2023-11-26',
               '2023-11-27 to 2023-12-03',
               '2023-12-04 to 2023-12-10',
               '2023-12-11 to 2023-12-15',
            ],
            selectedWeek: ms(null),
            evaluationData: [
               {
                  evaluateeFirstName: 'Jonathan',
                  evaluateeMiddleName: null,
                  evaluateeLastName: 'Doe',
                  week: 'week1',
                  comment: 'Great teamwork and communication.',
                  ratings: [
                     {
                        score: 5,
                        criterion: { criterionDesc: 'Teamwork', maxScore: 5 },
                     },
                     {
                        score: 5,
                        criterion: {
                           criterionDesc: 'Communication',
                           maxScore: 5,
                        },
                     },
                  ],
               },
            ],
         }
      },
      components: { PeerEvalTable: Z_, WeekDropdown: wr },
      methods: {
         getPeerEvalEntriesForWeek(e) {
            V_.get('http://localhost:3000/peer-eval-entries', {
               params: { week: e },
            })
               .then((t) => {
                  this.peerEvalEntriesForWeek = t.data
               })
               .catch((t) => {
                  console.log(t)
               })
         },
         setSelectedWeek(e) {
            this.selectedWeek == null
               ? (this.selectedWeek = this.getCurrentWeek())
               : (this.selectedWeek = e)
         },
         getCurrentWeek() {
            var e = new Date(),
               t = String(e.getDate()).padStart(2, '0'),
               n = String(e.getMonth() + 1).padStart(2, '0'),
               s = e.getFullYear()
            e = s + '-' + n + '-' + t
            var r = this.weeks.find((o) => {
               var i = o.split(' ')[0],
                  a = o.split(' ')[2]
               return e >= i && e <= a
            })
            return r
         },
      },
      computed: {
         currentWeekVar() {
            return this.getCurrentWeek()
         },
      },
      mounted() {
         this.setSelectedWeek()
      },
   },
   tg = { class: 'student-pe-container' }
function ng(e, t, n, s, r, o) {
   const i = Le('WeekDropdown'),
      a = Le('PeerEvalTable')
   return (
      ne(),
      le('div', tg, [
         oe(
            i,
            {
               currentWeek: o.currentWeekVar,
               selectWeek: this.selectedWeek,
               displayedWeeks: r.weeks,
               onSelectWeek: o.setSelectedWeek,
            },
            null,
            8,
            ['currentWeek', 'selectWeek', 'displayedWeeks', 'onSelectWeek']
         ),
         oe(a, { peerEval: r.evaluationData }, null, 8, ['peerEval']),
      ])
   )
}
const sg = Re(eg, [
   ['render', ng],
   ['__scopeId', 'data-v-225f26eb'],
])
const rg = {
      name: 'WarTable',
      components: { WarList: Ac, AddWarTask: Sc },
      props: { team: Array },
      data() {
         return {
            team: [
               {
                  student: 'John Doe',
                  tasks: [
                     {
                        task: 'Task 1',
                        plannedTask: 'Planned Task 1',
                        description: 'Description 1',
                        plannedHours: 1,
                        actualHours: 1,
                        status: 'Status 1',
                     },
                     {
                        task: 'Task 2',
                        plannedTask: 'Planned Task 2',
                        description: 'Description 2',
                        plannedHours: 2,
                        actualHours: 2,
                        status: 'Status 2',
                     },
                     {
                        task: 'Task 3',
                        plannedTask: 'Planned Task 3',
                        description: 'Description 3',
                        plannedHours: 3,
                        actualHours: 3,
                        status: 'Status 3',
                     },
                  ],
               },
               {
                  student: 'Jane Doe',
                  tasks: [
                     {
                        task: 'Task 1',
                        plannedTask: 'Planned Task 1',
                        description: 'Description 1',
                        plannedHours: 1,
                        actualHours: 1,
                        status: 'Status 1',
                     },
                     {
                        task: 'Task 2',
                        plannedTask: 'Planned Task 2',
                        description: 'Description 2',
                        plannedHours: 2,
                        actualHours: 2,
                        status: 'Status 2',
                     },
                     {
                        task: 'Task 3',
                        plannedTask: 'Planned Task 3',
                        description: 'Description 3',
                        plannedHours: 3,
                        actualHours: 3,
                        status: 'Status 3',
                     },
                  ],
               },
            ],
         }
      },
      methods: {
         addTask(e) {
            this.tasks.push(e)
         },
      },
      computed: {},
   },
   og = { class: 'war-table-container' }
function ig(e, t, n, s, r, o) {
   const i = Le('WarList')
   return (
      ne(),
      le('div', og, [
         (ne(!0),
         le(
            be,
            null,
            tn(
               r.team,
               (a) => (ne(), ri(i, { tasks: a.tasks }, null, 8, ['tasks']))
            ),
            256
         )),
      ])
   )
}
const ag = Re(rg, [
   ['render', ig],
   ['__scopeId', 'data-v-10606be7'],
])
const lg = {
      name: 'StudentTeamView',
      props: { selectWeek: String, currentWeek: String },
      components: { NavbarSide: Mc, WeekDropdown: wr, WarTable: ag },
      data() {
         return {
            team: [
               {
                  student: 'John Doe',
                  tasks: [
                     {
                        task: 'Task 1',
                        plannedTask: 'Planned Task 1',
                        description: 'Description 1',
                        plannedHours: 1,
                        actualHours: 1,
                        status: 'Status 1',
                     },
                     {
                        task: 'Task 2',
                        plannedTask: 'Planned Task 2',
                        description: 'Description 2',
                        plannedHours: 2,
                        actualHours: 2,
                        status: 'Status 2',
                     },
                     {
                        task: 'Task 3',
                        plannedTask: 'Planned Task 3',
                        description: 'Description 3',
                        plannedHours: 3,
                        actualHours: 3,
                        status: 'Status 3',
                     },
                  ],
               },
               {
                  student: 'Jane Doe',
                  tasks: [
                     {
                        task: 'Task 1',
                        plannedTask: 'Planned Task 1',
                        description: 'Description 1',
                        plannedHours: 1,
                        actualHours: 1,
                        status: 'Status 1',
                     },
                     {
                        task: 'Task 2',
                        plannedTask: 'Planned Task 2',
                        description: 'Description 2',
                        plannedHours: 2,
                        actualHours: 2,
                        status: 'Status 2',
                     },
                     {
                        task: 'Task 3',
                        plannedTask: 'Planned Task 3',
                        description: 'Description 3',
                        plannedHours: 3,
                        actualHours: 3,
                        status: 'Status 3',
                     },
                  ],
               },
            ],
            selectedWeek: ms(null),
            weeks: [
               '2023-09-01 to 2023-09-03',
               '2023-09-04 to 2023-09-10',
               '2023-09-11 to 2023-09-17',
               '2023-09-18 to 2023-09-24',
               '2023-09-25 to 2023-10-01',
               '2023-10-02 to 2023-10-08',
               '2023-10-09 to 2023-10-15',
               '2023-10-16 to 2023-10-22',
               '2023-10-23 to 2023-10-29',
               '2023-10-30 to 2023-11-05',
               '2023-11-06 to 2023-11-12',
               '2023-11-13 to 2023-11-19',
               '2023-11-20 to 2023-11-26',
               '2023-11-27 to 2023-12-03',
               '2023-12-04 to 2023-12-10',
               '2023-12-11 to 2023-12-15',
            ],
         }
      },
      methods: {
         setSelectedWeek(e) {
            this.selectedWeek == null
               ? (this.selectedWeek = this.getCurrentWeek())
               : (this.selectedWeek = e)
         },
         getCurrentWeek() {
            var e = new Date(),
               t = String(e.getDate()).padStart(2, '0'),
               n = String(e.getMonth() + 1).padStart(2, '0'),
               s = e.getFullYear()
            e = s + '-' + n + '-' + t
            var r = this.weeks.find((o) => {
               var i = o.split(' ')[0],
                  a = o.split(' ')[2]
               return e >= i && e <= a
            })
            return r
         },
      },
      computed: {
         currentWeekVar() {
            return this.getCurrentWeek()
         },
      },
      mounted() {
         this.setSelectedWeek()
      },
   },
   cg = { class: 'student-team-view' }
function ug(e, t, n, s, r, o) {
   const i = Le('WeekDropdown'),
      a = Le('WarTable')
   return (
      ne(),
      le('div', cg, [
         oe(
            i,
            {
               'current-week': o.currentWeekVar,
               'select-week': this.selectedWeek,
               displayedWeeks: r.weeks,
               onSelectWeek: o.setSelectedWeek,
            },
            null,
            8,
            ['current-week', 'select-week', 'displayedWeeks', 'onSelectWeek']
         ),
         oe(a, { team: r.team }, null, 8, ['team']),
      ])
   )
}
const fg = Re(lg, [
   ['render', ug],
   ['__scopeId', 'data-v-bbf22fbf'],
])
const dg = { name: 'InstructorNavbarSide' },
   hg = { class: 'nav nav-pills flex-column justify-content' },
   pg = { class: 'nav-item' },
   mg = { class: 'nav-item' }
function _g(e, t, n, s, r, o) {
   const i = Le('router-link')
   return (
      ne(),
      le('ul', hg, [
         D('li', pg, [
            oe(
               i,
               { to: '/instructorhome/instructorpeereval' },
               { default: Gt(() => [Xt('Instructor Peer Evaluation')]), _: 1 }
            ),
         ]),
         D('li', mg, [
            oe(
               i,
               { to: '/instructorwar' },
               { default: Gt(() => [Xt('Instructor WAR')]), _: 1 }
            ),
         ]),
      ])
   )
}
const ou = Re(dg, [
   ['render', _g],
   ['__scopeId', 'data-v-6f47adde'],
])
const gg = { class: 'sidebar' },
   Eg = { class: 'main-item' },
   vg = {
      name: 'InstructorHomePageView',
      components: { InstructorNavbarSide: ou },
      data() {
         return {}
      },
      methods: {},
      computed: {},
   },
   bg = Object.assign(vg, {
      setup(e) {
         return (t, n) => {
            const s = Le('router-view')
            return (
               ne(),
               le(be, null, [D('div', gg, [oe(ou)]), D('div', Eg, [oe(s)])], 64)
            )
         }
      },
   }),
   yg = Re(bg, [['__scopeId', 'data-v-917a532e']])
const wg = {
      name: 'InstructorPeerEvalView',
      data() {
         return {
            students: [
               { id: 1, name: 'Alice', grade: 'A' },
               { id: 2, name: 'Bob', grade: 'B' },
            ],
         }
      },
   },
   iu = (e) => (mr('data-v-adc597ca'), (e = e()), _r(), e),
   Tg = { class: 'instructor-pe-container' },
   Ag = iu(() => D('h1', null, 'Instructor Peer Evaluation', -1)),
   Sg = iu(() =>
      D(
         'thead',
         null,
         [
            D('tr', null, [
               D('th', null, 'Student Name'),
               D('th', null, 'Grade'),
            ]),
         ],
         -1
      )
   )
function Og(e, t, n, s, r, o) {
   return (
      ne(),
      le('div', Tg, [
         Ag,
         D('table', null, [
            Sg,
            D('tbody', null, [
               (ne(!0),
               le(
                  be,
                  null,
                  tn(
                     r.students,
                     (i) => (
                        ne(),
                        le('tr', { key: i.id }, [
                           D('td', null, Be(i.name), 1),
                           D('td', null, Be(i.grade), 1),
                        ])
                     )
                  ),
                  128
               )),
            ]),
         ]),
      ])
   )
}
const Cg = Re(wg, [
      ['render', Og],
      ['__scopeId', 'data-v-adc597ca'],
   ]),
   Ng = [
      { path: '/', name: 'Login', component: _a },
      {
         path: '/studenthome',
         component: Tm,
         children: [
            { path: 'studentwar', component: ga },
            { path: '', component: ga },
            { path: 'studentpeereval', component: sg },
            { path: 'team', component: fg },
         ],
      },
      {
         path: '/instructorhome',
         component: yg,
         children: [
            {
               path: 'instructorpeereval',
               name: 'InstructorPeerEval',
               component: Cg,
            },
         ],
      },
      { path: '/:catchAll(.*)', name: 'not-found', component: _a },
   ],
   xg = um({ history: Op(), routes: Ng })
var Ne = 'top',
   je = 'bottom',
   Ue = 'right',
   xe = 'left',
   xr = 'auto',
   jn = [Ne, je, Ue, xe],
   an = 'start',
   kn = 'end',
   au = 'clippingParents',
   _i = 'viewport',
   gn = 'popper',
   lu = 'reference',
   Lo = jn.reduce(function (e, t) {
      return e.concat([t + '-' + an, t + '-' + kn])
   }, []),
   gi = [].concat(jn, [xr]).reduce(function (e, t) {
      return e.concat([t, t + '-' + an, t + '-' + kn])
   }, []),
   cu = 'beforeRead',
   uu = 'read',
   fu = 'afterRead',
   du = 'beforeMain',
   hu = 'main',
   pu = 'afterMain',
   mu = 'beforeWrite',
   _u = 'write',
   gu = 'afterWrite',
   Eu = [cu, uu, fu, du, hu, pu, mu, _u, gu]
function _t(e) {
   return e ? (e.nodeName || '').toLowerCase() : null
}
function Ke(e) {
   if (e == null) return window
   if (e.toString() !== '[object Window]') {
      var t = e.ownerDocument
      return (t && t.defaultView) || window
   }
   return e
}
function ln(e) {
   var t = Ke(e).Element
   return e instanceof t || e instanceof Element
}
function Ye(e) {
   var t = Ke(e).HTMLElement
   return e instanceof t || e instanceof HTMLElement
}
function Ei(e) {
   if (typeof ShadowRoot > 'u') return !1
   var t = Ke(e).ShadowRoot
   return e instanceof t || e instanceof ShadowRoot
}
function Rg(e) {
   var t = e.state
   Object.keys(t.elements).forEach(function (n) {
      var s = t.styles[n] || {},
         r = t.attributes[n] || {},
         o = t.elements[n]
      !Ye(o) ||
         !_t(o) ||
         (Object.assign(o.style, s),
         Object.keys(r).forEach(function (i) {
            var a = r[i]
            a === !1
               ? o.removeAttribute(i)
               : o.setAttribute(i, a === !0 ? '' : a)
         }))
   })
}
function Pg(e) {
   var t = e.state,
      n = {
         popper: {
            position: t.options.strategy,
            left: '0',
            top: '0',
            margin: '0',
         },
         arrow: { position: 'absolute' },
         reference: {},
      }
   return (
      Object.assign(t.elements.popper.style, n.popper),
      (t.styles = n),
      t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
      function () {
         Object.keys(t.elements).forEach(function (s) {
            var r = t.elements[s],
               o = t.attributes[s] || {},
               i = Object.keys(t.styles.hasOwnProperty(s) ? t.styles[s] : n[s]),
               a = i.reduce(function (l, u) {
                  return (l[u] = ''), l
               }, {})
            !Ye(r) ||
               !_t(r) ||
               (Object.assign(r.style, a),
               Object.keys(o).forEach(function (l) {
                  r.removeAttribute(l)
               }))
         })
      }
   )
}
const vi = {
   name: 'applyStyles',
   enabled: !0,
   phase: 'write',
   fn: Rg,
   effect: Pg,
   requires: ['computeStyles'],
}
function ht(e) {
   return e.split('-')[0]
}
var sn = Math.max,
   tr = Math.min,
   Dn = Math.round
function Io() {
   var e = navigator.userAgentData
   return e != null && e.brands && Array.isArray(e.brands)
      ? e.brands
           .map(function (t) {
              return t.brand + '/' + t.version
           })
           .join(' ')
      : navigator.userAgent
}
function vu() {
   return !/^((?!chrome|android).)*safari/i.test(Io())
}
function $n(e, t, n) {
   t === void 0 && (t = !1), n === void 0 && (n = !1)
   var s = e.getBoundingClientRect(),
      r = 1,
      o = 1
   t &&
      Ye(e) &&
      ((r = (e.offsetWidth > 0 && Dn(s.width) / e.offsetWidth) || 1),
      (o = (e.offsetHeight > 0 && Dn(s.height) / e.offsetHeight) || 1))
   var i = ln(e) ? Ke(e) : window,
      a = i.visualViewport,
      l = !vu() && n,
      u = (s.left + (l && a ? a.offsetLeft : 0)) / r,
      c = (s.top + (l && a ? a.offsetTop : 0)) / o,
      d = s.width / r,
      p = s.height / o
   return {
      width: d,
      height: p,
      top: c,
      right: u + d,
      bottom: c + p,
      left: u,
      x: u,
      y: c,
   }
}
function bi(e) {
   var t = $n(e),
      n = e.offsetWidth,
      s = e.offsetHeight
   return (
      Math.abs(t.width - n) <= 1 && (n = t.width),
      Math.abs(t.height - s) <= 1 && (s = t.height),
      { x: e.offsetLeft, y: e.offsetTop, width: n, height: s }
   )
}
function bu(e, t) {
   var n = t.getRootNode && t.getRootNode()
   if (e.contains(t)) return !0
   if (n && Ei(n)) {
      var s = t
      do {
         if (s && e.isSameNode(s)) return !0
         s = s.parentNode || s.host
      } while (s)
   }
   return !1
}
function Ct(e) {
   return Ke(e).getComputedStyle(e)
}
function kg(e) {
   return ['table', 'td', 'th'].indexOf(_t(e)) >= 0
}
function Bt(e) {
   return ((ln(e) ? e.ownerDocument : e.document) || window.document)
      .documentElement
}
function Rr(e) {
   return _t(e) === 'html'
      ? e
      : e.assignedSlot || e.parentNode || (Ei(e) ? e.host : null) || Bt(e)
}
function Ka(e) {
   return !Ye(e) || Ct(e).position === 'fixed' ? null : e.offsetParent
}
function Dg(e) {
   var t = /firefox/i.test(Io()),
      n = /Trident/i.test(Io())
   if (n && Ye(e)) {
      var s = Ct(e)
      if (s.position === 'fixed') return null
   }
   var r = Rr(e)
   for (Ei(r) && (r = r.host); Ye(r) && ['html', 'body'].indexOf(_t(r)) < 0; ) {
      var o = Ct(r)
      if (
         o.transform !== 'none' ||
         o.perspective !== 'none' ||
         o.contain === 'paint' ||
         ['transform', 'perspective'].indexOf(o.willChange) !== -1 ||
         (t && o.willChange === 'filter') ||
         (t && o.filter && o.filter !== 'none')
      )
         return r
      r = r.parentNode
   }
   return null
}
function Es(e) {
   for (var t = Ke(e), n = Ka(e); n && kg(n) && Ct(n).position === 'static'; )
      n = Ka(n)
   return n &&
      (_t(n) === 'html' || (_t(n) === 'body' && Ct(n).position === 'static'))
      ? t
      : n || Dg(e) || t
}
function yi(e) {
   return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y'
}
function os(e, t, n) {
   return sn(e, tr(t, n))
}
function $g(e, t, n) {
   var s = os(e, t, n)
   return s > n ? n : s
}
function yu() {
   return { top: 0, right: 0, bottom: 0, left: 0 }
}
function wu(e) {
   return Object.assign({}, yu(), e)
}
function Tu(e, t) {
   return t.reduce(function (n, s) {
      return (n[s] = e), n
   }, {})
}
var Lg = function (t, n) {
   return (
      (t =
         typeof t == 'function'
            ? t(Object.assign({}, n.rects, { placement: n.placement }))
            : t),
      wu(typeof t != 'number' ? t : Tu(t, jn))
   )
}
function Ig(e) {
   var t,
      n = e.state,
      s = e.name,
      r = e.options,
      o = n.elements.arrow,
      i = n.modifiersData.popperOffsets,
      a = ht(n.placement),
      l = yi(a),
      u = [xe, Ue].indexOf(a) >= 0,
      c = u ? 'height' : 'width'
   if (!(!o || !i)) {
      var d = Lg(r.padding, n),
         p = bi(o),
         _ = l === 'y' ? Ne : xe,
         g = l === 'y' ? je : Ue,
         E =
            n.rects.reference[c] +
            n.rects.reference[l] -
            i[l] -
            n.rects.popper[c],
         O = i[l] - n.rects.reference[l],
         N = Es(o),
         P = N ? (l === 'y' ? N.clientHeight || 0 : N.clientWidth || 0) : 0,
         M = E / 2 - O / 2,
         C = d[_],
         U = P - p[c] - d[g],
         K = P / 2 - p[c] / 2 + M,
         Q = os(C, K, U),
         ce = l
      n.modifiersData[s] = ((t = {}), (t[ce] = Q), (t.centerOffset = Q - K), t)
   }
}
function Mg(e) {
   var t = e.state,
      n = e.options,
      s = n.element,
      r = s === void 0 ? '[data-popper-arrow]' : s
   r != null &&
      ((typeof r == 'string' &&
         ((r = t.elements.popper.querySelector(r)), !r)) ||
         (bu(t.elements.popper, r) && (t.elements.arrow = r)))
}
const Au = {
   name: 'arrow',
   enabled: !0,
   phase: 'main',
   fn: Ig,
   effect: Mg,
   requires: ['popperOffsets'],
   requiresIfExists: ['preventOverflow'],
}
function Ln(e) {
   return e.split('-')[1]
}
var Hg = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' }
function Fg(e, t) {
   var n = e.x,
      s = e.y,
      r = t.devicePixelRatio || 1
   return { x: Dn(n * r) / r || 0, y: Dn(s * r) / r || 0 }
}
function za(e) {
   var t,
      n = e.popper,
      s = e.popperRect,
      r = e.placement,
      o = e.variation,
      i = e.offsets,
      a = e.position,
      l = e.gpuAcceleration,
      u = e.adaptive,
      c = e.roundOffsets,
      d = e.isFixed,
      p = i.x,
      _ = p === void 0 ? 0 : p,
      g = i.y,
      E = g === void 0 ? 0 : g,
      O = typeof c == 'function' ? c({ x: _, y: E }) : { x: _, y: E }
   ;(_ = O.x), (E = O.y)
   var N = i.hasOwnProperty('x'),
      P = i.hasOwnProperty('y'),
      M = xe,
      C = Ne,
      U = window
   if (u) {
      var K = Es(n),
         Q = 'clientHeight',
         ce = 'clientWidth'
      if (
         (K === Ke(n) &&
            ((K = Bt(n)),
            Ct(K).position !== 'static' &&
               a === 'absolute' &&
               ((Q = 'scrollHeight'), (ce = 'scrollWidth'))),
         (K = K),
         r === Ne || ((r === xe || r === Ue) && o === kn))
      ) {
         C = je
         var fe =
            d && K === U && U.visualViewport ? U.visualViewport.height : K[Q]
         ;(E -= fe - s.height), (E *= l ? 1 : -1)
      }
      if (r === xe || ((r === Ne || r === je) && o === kn)) {
         M = Ue
         var re =
            d && K === U && U.visualViewport ? U.visualViewport.width : K[ce]
         ;(_ -= re - s.width), (_ *= l ? 1 : -1)
      }
   }
   var de = Object.assign({ position: a }, u && Hg),
      ve = c === !0 ? Fg({ x: _, y: E }, Ke(n)) : { x: _, y: E }
   if (((_ = ve.x), (E = ve.y), l)) {
      var ue
      return Object.assign(
         {},
         de,
         ((ue = {}),
         (ue[C] = P ? '0' : ''),
         (ue[M] = N ? '0' : ''),
         (ue.transform =
            (U.devicePixelRatio || 1) <= 1
               ? 'translate(' + _ + 'px, ' + E + 'px)'
               : 'translate3d(' + _ + 'px, ' + E + 'px, 0)'),
         ue)
      )
   }
   return Object.assign(
      {},
      de,
      ((t = {}),
      (t[C] = P ? E + 'px' : ''),
      (t[M] = N ? _ + 'px' : ''),
      (t.transform = ''),
      t)
   )
}
function Wg(e) {
   var t = e.state,
      n = e.options,
      s = n.gpuAcceleration,
      r = s === void 0 ? !0 : s,
      o = n.adaptive,
      i = o === void 0 ? !0 : o,
      a = n.roundOffsets,
      l = a === void 0 ? !0 : a,
      u = {
         placement: ht(t.placement),
         variation: Ln(t.placement),
         popper: t.elements.popper,
         popperRect: t.rects.popper,
         gpuAcceleration: r,
         isFixed: t.options.strategy === 'fixed',
      }
   t.modifiersData.popperOffsets != null &&
      (t.styles.popper = Object.assign(
         {},
         t.styles.popper,
         za(
            Object.assign({}, u, {
               offsets: t.modifiersData.popperOffsets,
               position: t.options.strategy,
               adaptive: i,
               roundOffsets: l,
            })
         )
      )),
      t.modifiersData.arrow != null &&
         (t.styles.arrow = Object.assign(
            {},
            t.styles.arrow,
            za(
               Object.assign({}, u, {
                  offsets: t.modifiersData.arrow,
                  position: 'absolute',
                  adaptive: !1,
                  roundOffsets: l,
               })
            )
         )),
      (t.attributes.popper = Object.assign({}, t.attributes.popper, {
         'data-popper-placement': t.placement,
      }))
}
const wi = {
   name: 'computeStyles',
   enabled: !0,
   phase: 'beforeWrite',
   fn: Wg,
   data: {},
}
var xs = { passive: !0 }
function Vg(e) {
   var t = e.state,
      n = e.instance,
      s = e.options,
      r = s.scroll,
      o = r === void 0 ? !0 : r,
      i = s.resize,
      a = i === void 0 ? !0 : i,
      l = Ke(t.elements.popper),
      u = [].concat(t.scrollParents.reference, t.scrollParents.popper)
   return (
      o &&
         u.forEach(function (c) {
            c.addEventListener('scroll', n.update, xs)
         }),
      a && l.addEventListener('resize', n.update, xs),
      function () {
         o &&
            u.forEach(function (c) {
               c.removeEventListener('scroll', n.update, xs)
            }),
            a && l.removeEventListener('resize', n.update, xs)
      }
   )
}
const Ti = {
   name: 'eventListeners',
   enabled: !0,
   phase: 'write',
   fn: function () {},
   effect: Vg,
   data: {},
}
var Bg = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
function Ks(e) {
   return e.replace(/left|right|bottom|top/g, function (t) {
      return Bg[t]
   })
}
var jg = { start: 'end', end: 'start' }
function qa(e) {
   return e.replace(/start|end/g, function (t) {
      return jg[t]
   })
}
function Ai(e) {
   var t = Ke(e),
      n = t.pageXOffset,
      s = t.pageYOffset
   return { scrollLeft: n, scrollTop: s }
}
function Si(e) {
   return $n(Bt(e)).left + Ai(e).scrollLeft
}
function Ug(e, t) {
   var n = Ke(e),
      s = Bt(e),
      r = n.visualViewport,
      o = s.clientWidth,
      i = s.clientHeight,
      a = 0,
      l = 0
   if (r) {
      ;(o = r.width), (i = r.height)
      var u = vu()
      ;(u || (!u && t === 'fixed')) && ((a = r.offsetLeft), (l = r.offsetTop))
   }
   return { width: o, height: i, x: a + Si(e), y: l }
}
function Kg(e) {
   var t,
      n = Bt(e),
      s = Ai(e),
      r = (t = e.ownerDocument) == null ? void 0 : t.body,
      o = sn(
         n.scrollWidth,
         n.clientWidth,
         r ? r.scrollWidth : 0,
         r ? r.clientWidth : 0
      ),
      i = sn(
         n.scrollHeight,
         n.clientHeight,
         r ? r.scrollHeight : 0,
         r ? r.clientHeight : 0
      ),
      a = -s.scrollLeft + Si(e),
      l = -s.scrollTop
   return (
      Ct(r || n).direction === 'rtl' &&
         (a += sn(n.clientWidth, r ? r.clientWidth : 0) - o),
      { width: o, height: i, x: a, y: l }
   )
}
function Oi(e) {
   var t = Ct(e),
      n = t.overflow,
      s = t.overflowX,
      r = t.overflowY
   return /auto|scroll|overlay|hidden/.test(n + r + s)
}
function Su(e) {
   return ['html', 'body', '#document'].indexOf(_t(e)) >= 0
      ? e.ownerDocument.body
      : Ye(e) && Oi(e)
      ? e
      : Su(Rr(e))
}
function is(e, t) {
   var n
   t === void 0 && (t = [])
   var s = Su(e),
      r = s === ((n = e.ownerDocument) == null ? void 0 : n.body),
      o = Ke(s),
      i = r ? [o].concat(o.visualViewport || [], Oi(s) ? s : []) : s,
      a = t.concat(i)
   return r ? a : a.concat(is(Rr(i)))
}
function Mo(e) {
   return Object.assign({}, e, {
      left: e.x,
      top: e.y,
      right: e.x + e.width,
      bottom: e.y + e.height,
   })
}
function zg(e, t) {
   var n = $n(e, !1, t === 'fixed')
   return (
      (n.top = n.top + e.clientTop),
      (n.left = n.left + e.clientLeft),
      (n.bottom = n.top + e.clientHeight),
      (n.right = n.left + e.clientWidth),
      (n.width = e.clientWidth),
      (n.height = e.clientHeight),
      (n.x = n.left),
      (n.y = n.top),
      n
   )
}
function Ya(e, t, n) {
   return t === _i ? Mo(Ug(e, n)) : ln(t) ? zg(t, n) : Mo(Kg(Bt(e)))
}
function qg(e) {
   var t = is(Rr(e)),
      n = ['absolute', 'fixed'].indexOf(Ct(e).position) >= 0,
      s = n && Ye(e) ? Es(e) : e
   return ln(s)
      ? t.filter(function (r) {
           return ln(r) && bu(r, s) && _t(r) !== 'body'
        })
      : []
}
function Yg(e, t, n, s) {
   var r = t === 'clippingParents' ? qg(e) : [].concat(t),
      o = [].concat(r, [n]),
      i = o[0],
      a = o.reduce(
         function (l, u) {
            var c = Ya(e, u, s)
            return (
               (l.top = sn(c.top, l.top)),
               (l.right = tr(c.right, l.right)),
               (l.bottom = tr(c.bottom, l.bottom)),
               (l.left = sn(c.left, l.left)),
               l
            )
         },
         Ya(e, i, s)
      )
   return (
      (a.width = a.right - a.left),
      (a.height = a.bottom - a.top),
      (a.x = a.left),
      (a.y = a.top),
      a
   )
}
function Ou(e) {
   var t = e.reference,
      n = e.element,
      s = e.placement,
      r = s ? ht(s) : null,
      o = s ? Ln(s) : null,
      i = t.x + t.width / 2 - n.width / 2,
      a = t.y + t.height / 2 - n.height / 2,
      l
   switch (r) {
      case Ne:
         l = { x: i, y: t.y - n.height }
         break
      case je:
         l = { x: i, y: t.y + t.height }
         break
      case Ue:
         l = { x: t.x + t.width, y: a }
         break
      case xe:
         l = { x: t.x - n.width, y: a }
         break
      default:
         l = { x: t.x, y: t.y }
   }
   var u = r ? yi(r) : null
   if (u != null) {
      var c = u === 'y' ? 'height' : 'width'
      switch (o) {
         case an:
            l[u] = l[u] - (t[c] / 2 - n[c] / 2)
            break
         case kn:
            l[u] = l[u] + (t[c] / 2 - n[c] / 2)
            break
      }
   }
   return l
}
function In(e, t) {
   t === void 0 && (t = {})
   var n = t,
      s = n.placement,
      r = s === void 0 ? e.placement : s,
      o = n.strategy,
      i = o === void 0 ? e.strategy : o,
      a = n.boundary,
      l = a === void 0 ? au : a,
      u = n.rootBoundary,
      c = u === void 0 ? _i : u,
      d = n.elementContext,
      p = d === void 0 ? gn : d,
      _ = n.altBoundary,
      g = _ === void 0 ? !1 : _,
      E = n.padding,
      O = E === void 0 ? 0 : E,
      N = wu(typeof O != 'number' ? O : Tu(O, jn)),
      P = p === gn ? lu : gn,
      M = e.rects.popper,
      C = e.elements[g ? P : p],
      U = Yg(ln(C) ? C : C.contextElement || Bt(e.elements.popper), l, c, i),
      K = $n(e.elements.reference),
      Q = Ou({ reference: K, element: M, strategy: 'absolute', placement: r }),
      ce = Mo(Object.assign({}, M, Q)),
      fe = p === gn ? ce : K,
      re = {
         top: U.top - fe.top + N.top,
         bottom: fe.bottom - U.bottom + N.bottom,
         left: U.left - fe.left + N.left,
         right: fe.right - U.right + N.right,
      },
      de = e.modifiersData.offset
   if (p === gn && de) {
      var ve = de[r]
      Object.keys(re).forEach(function (ue) {
         var Me = [Ue, je].indexOf(ue) >= 0 ? 1 : -1,
            Pe = [Ne, je].indexOf(ue) >= 0 ? 'y' : 'x'
         re[ue] += ve[Pe] * Me
      })
   }
   return re
}
function Gg(e, t) {
   t === void 0 && (t = {})
   var n = t,
      s = n.placement,
      r = n.boundary,
      o = n.rootBoundary,
      i = n.padding,
      a = n.flipVariations,
      l = n.allowedAutoPlacements,
      u = l === void 0 ? gi : l,
      c = Ln(s),
      d = c
         ? a
            ? Lo
            : Lo.filter(function (g) {
                 return Ln(g) === c
              })
         : jn,
      p = d.filter(function (g) {
         return u.indexOf(g) >= 0
      })
   p.length === 0 && (p = d)
   var _ = p.reduce(function (g, E) {
      return (
         (g[E] = In(e, {
            placement: E,
            boundary: r,
            rootBoundary: o,
            padding: i,
         })[ht(E)]),
         g
      )
   }, {})
   return Object.keys(_).sort(function (g, E) {
      return _[g] - _[E]
   })
}
function Jg(e) {
   if (ht(e) === xr) return []
   var t = Ks(e)
   return [qa(e), t, qa(t)]
}
function Xg(e) {
   var t = e.state,
      n = e.options,
      s = e.name
   if (!t.modifiersData[s]._skip) {
      for (
         var r = n.mainAxis,
            o = r === void 0 ? !0 : r,
            i = n.altAxis,
            a = i === void 0 ? !0 : i,
            l = n.fallbackPlacements,
            u = n.padding,
            c = n.boundary,
            d = n.rootBoundary,
            p = n.altBoundary,
            _ = n.flipVariations,
            g = _ === void 0 ? !0 : _,
            E = n.allowedAutoPlacements,
            O = t.options.placement,
            N = ht(O),
            P = N === O,
            M = l || (P || !g ? [Ks(O)] : Jg(O)),
            C = [O].concat(M).reduce(function (Fe, We) {
               return Fe.concat(
                  ht(We) === xr
                     ? Gg(t, {
                          placement: We,
                          boundary: c,
                          rootBoundary: d,
                          padding: u,
                          flipVariations: g,
                          allowedAutoPlacements: E,
                       })
                     : We
               )
            }, []),
            U = t.rects.reference,
            K = t.rects.popper,
            Q = new Map(),
            ce = !0,
            fe = C[0],
            re = 0;
         re < C.length;
         re++
      ) {
         var de = C[re],
            ve = ht(de),
            ue = Ln(de) === an,
            Me = [Ne, je].indexOf(ve) >= 0,
            Pe = Me ? 'width' : 'height',
            ee = In(t, {
               placement: de,
               boundary: c,
               rootBoundary: d,
               altBoundary: p,
               padding: u,
            }),
            q = Me ? (ue ? Ue : xe) : ue ? je : Ne
         U[Pe] > K[Pe] && (q = Ks(q))
         var G = Ks(q),
            we = []
         if (
            (o && we.push(ee[ve] <= 0),
            a && we.push(ee[q] <= 0, ee[G] <= 0),
            we.every(function (Fe) {
               return Fe
            }))
         ) {
            ;(fe = de), (ce = !1)
            break
         }
         Q.set(de, we)
      }
      if (ce)
         for (
            var He = g ? 3 : 1,
               ke = function (We) {
                  var me = C.find(function (b) {
                     var $ = Q.get(b)
                     if ($)
                        return $.slice(0, We).every(function (k) {
                           return k
                        })
                  })
                  if (me) return (fe = me), 'break'
               },
               _e = He;
            _e > 0;
            _e--
         ) {
            var Qe = ke(_e)
            if (Qe === 'break') break
         }
      t.placement !== fe &&
         ((t.modifiersData[s]._skip = !0), (t.placement = fe), (t.reset = !0))
   }
}
const Cu = {
   name: 'flip',
   enabled: !0,
   phase: 'main',
   fn: Xg,
   requiresIfExists: ['offset'],
   data: { _skip: !1 },
}
function Ga(e, t, n) {
   return (
      n === void 0 && (n = { x: 0, y: 0 }),
      {
         top: e.top - t.height - n.y,
         right: e.right - t.width + n.x,
         bottom: e.bottom - t.height + n.y,
         left: e.left - t.width - n.x,
      }
   )
}
function Ja(e) {
   return [Ne, Ue, je, xe].some(function (t) {
      return e[t] >= 0
   })
}
function Qg(e) {
   var t = e.state,
      n = e.name,
      s = t.rects.reference,
      r = t.rects.popper,
      o = t.modifiersData.preventOverflow,
      i = In(t, { elementContext: 'reference' }),
      a = In(t, { altBoundary: !0 }),
      l = Ga(i, s),
      u = Ga(a, r, o),
      c = Ja(l),
      d = Ja(u)
   ;(t.modifiersData[n] = {
      referenceClippingOffsets: l,
      popperEscapeOffsets: u,
      isReferenceHidden: c,
      hasPopperEscaped: d,
   }),
      (t.attributes.popper = Object.assign({}, t.attributes.popper, {
         'data-popper-reference-hidden': c,
         'data-popper-escaped': d,
      }))
}
const Nu = {
   name: 'hide',
   enabled: !0,
   phase: 'main',
   requiresIfExists: ['preventOverflow'],
   fn: Qg,
}
function Zg(e, t, n) {
   var s = ht(e),
      r = [xe, Ne].indexOf(s) >= 0 ? -1 : 1,
      o =
         typeof n == 'function' ? n(Object.assign({}, t, { placement: e })) : n,
      i = o[0],
      a = o[1]
   return (
      (i = i || 0),
      (a = (a || 0) * r),
      [xe, Ue].indexOf(s) >= 0 ? { x: a, y: i } : { x: i, y: a }
   )
}
function eE(e) {
   var t = e.state,
      n = e.options,
      s = e.name,
      r = n.offset,
      o = r === void 0 ? [0, 0] : r,
      i = gi.reduce(function (c, d) {
         return (c[d] = Zg(d, t.rects, o)), c
      }, {}),
      a = i[t.placement],
      l = a.x,
      u = a.y
   t.modifiersData.popperOffsets != null &&
      ((t.modifiersData.popperOffsets.x += l),
      (t.modifiersData.popperOffsets.y += u)),
      (t.modifiersData[s] = i)
}
const xu = {
   name: 'offset',
   enabled: !0,
   phase: 'main',
   requires: ['popperOffsets'],
   fn: eE,
}
function tE(e) {
   var t = e.state,
      n = e.name
   t.modifiersData[n] = Ou({
      reference: t.rects.reference,
      element: t.rects.popper,
      strategy: 'absolute',
      placement: t.placement,
   })
}
const Ci = {
   name: 'popperOffsets',
   enabled: !0,
   phase: 'read',
   fn: tE,
   data: {},
}
function nE(e) {
   return e === 'x' ? 'y' : 'x'
}
function sE(e) {
   var t = e.state,
      n = e.options,
      s = e.name,
      r = n.mainAxis,
      o = r === void 0 ? !0 : r,
      i = n.altAxis,
      a = i === void 0 ? !1 : i,
      l = n.boundary,
      u = n.rootBoundary,
      c = n.altBoundary,
      d = n.padding,
      p = n.tether,
      _ = p === void 0 ? !0 : p,
      g = n.tetherOffset,
      E = g === void 0 ? 0 : g,
      O = In(t, { boundary: l, rootBoundary: u, padding: d, altBoundary: c }),
      N = ht(t.placement),
      P = Ln(t.placement),
      M = !P,
      C = yi(N),
      U = nE(C),
      K = t.modifiersData.popperOffsets,
      Q = t.rects.reference,
      ce = t.rects.popper,
      fe =
         typeof E == 'function'
            ? E(Object.assign({}, t.rects, { placement: t.placement }))
            : E,
      re =
         typeof fe == 'number'
            ? { mainAxis: fe, altAxis: fe }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, fe),
      de = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
      ve = { x: 0, y: 0 }
   if (K) {
      if (o) {
         var ue,
            Me = C === 'y' ? Ne : xe,
            Pe = C === 'y' ? je : Ue,
            ee = C === 'y' ? 'height' : 'width',
            q = K[C],
            G = q + O[Me],
            we = q - O[Pe],
            He = _ ? -ce[ee] / 2 : 0,
            ke = P === an ? Q[ee] : ce[ee],
            _e = P === an ? -ce[ee] : -Q[ee],
            Qe = t.elements.arrow,
            Fe = _ && Qe ? bi(Qe) : { width: 0, height: 0 },
            We = t.modifiersData['arrow#persistent']
               ? t.modifiersData['arrow#persistent'].padding
               : yu(),
            me = We[Me],
            b = We[Pe],
            $ = os(0, Q[ee], Fe[ee]),
            k = M
               ? Q[ee] / 2 - He - $ - me - re.mainAxis
               : ke - $ - me - re.mainAxis,
            H = M
               ? -Q[ee] / 2 + He + $ + b + re.mainAxis
               : _e + $ + b + re.mainAxis,
            J = t.elements.arrow && Es(t.elements.arrow),
            f = J ? (C === 'y' ? J.clientTop || 0 : J.clientLeft || 0) : 0,
            h = (ue = de == null ? void 0 : de[C]) != null ? ue : 0,
            m = q + k - h - f,
            v = q + H - h,
            w = os(_ ? tr(G, m) : G, q, _ ? sn(we, v) : we)
         ;(K[C] = w), (ve[C] = w - q)
      }
      if (a) {
         var T,
            L = C === 'x' ? Ne : xe,
            x = C === 'x' ? je : Ue,
            R = K[U],
            S = U === 'y' ? 'height' : 'width',
            W = R + O[L],
            I = R - O[x],
            F = [Ne, xe].indexOf(N) !== -1,
            B = (T = de == null ? void 0 : de[U]) != null ? T : 0,
            Y = F ? W : R - Q[S] - ce[S] - B + re.altAxis,
            ie = F ? R + Q[S] + ce[S] - B - re.altAxis : I,
            te = _ && F ? $g(Y, R, ie) : os(_ ? Y : W, R, _ ? ie : I)
         ;(K[U] = te), (ve[U] = te - R)
      }
      t.modifiersData[s] = ve
   }
}
const Ru = {
   name: 'preventOverflow',
   enabled: !0,
   phase: 'main',
   fn: sE,
   requiresIfExists: ['offset'],
}
function rE(e) {
   return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
}
function oE(e) {
   return e === Ke(e) || !Ye(e) ? Ai(e) : rE(e)
}
function iE(e) {
   var t = e.getBoundingClientRect(),
      n = Dn(t.width) / e.offsetWidth || 1,
      s = Dn(t.height) / e.offsetHeight || 1
   return n !== 1 || s !== 1
}
function aE(e, t, n) {
   n === void 0 && (n = !1)
   var s = Ye(t),
      r = Ye(t) && iE(t),
      o = Bt(t),
      i = $n(e, r, n),
      a = { scrollLeft: 0, scrollTop: 0 },
      l = { x: 0, y: 0 }
   return (
      (s || (!s && !n)) &&
         ((_t(t) !== 'body' || Oi(o)) && (a = oE(t)),
         Ye(t)
            ? ((l = $n(t, !0)), (l.x += t.clientLeft), (l.y += t.clientTop))
            : o && (l.x = Si(o))),
      {
         x: i.left + a.scrollLeft - l.x,
         y: i.top + a.scrollTop - l.y,
         width: i.width,
         height: i.height,
      }
   )
}
function lE(e) {
   var t = new Map(),
      n = new Set(),
      s = []
   e.forEach(function (o) {
      t.set(o.name, o)
   })
   function r(o) {
      n.add(o.name)
      var i = [].concat(o.requires || [], o.requiresIfExists || [])
      i.forEach(function (a) {
         if (!n.has(a)) {
            var l = t.get(a)
            l && r(l)
         }
      }),
         s.push(o)
   }
   return (
      e.forEach(function (o) {
         n.has(o.name) || r(o)
      }),
      s
   )
}
function cE(e) {
   var t = lE(e)
   return Eu.reduce(function (n, s) {
      return n.concat(
         t.filter(function (r) {
            return r.phase === s
         })
      )
   }, [])
}
function uE(e) {
   var t
   return function () {
      return (
         t ||
            (t = new Promise(function (n) {
               Promise.resolve().then(function () {
                  ;(t = void 0), n(e())
               })
            })),
         t
      )
   }
}
function fE(e) {
   var t = e.reduce(function (n, s) {
      var r = n[s.name]
      return (
         (n[s.name] = r
            ? Object.assign({}, r, s, {
                 options: Object.assign({}, r.options, s.options),
                 data: Object.assign({}, r.data, s.data),
              })
            : s),
         n
      )
   }, {})
   return Object.keys(t).map(function (n) {
      return t[n]
   })
}
var Xa = { placement: 'bottom', modifiers: [], strategy: 'absolute' }
function Qa() {
   for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n]
   return !t.some(function (s) {
      return !(s && typeof s.getBoundingClientRect == 'function')
   })
}
function Pr(e) {
   e === void 0 && (e = {})
   var t = e,
      n = t.defaultModifiers,
      s = n === void 0 ? [] : n,
      r = t.defaultOptions,
      o = r === void 0 ? Xa : r
   return function (a, l, u) {
      u === void 0 && (u = o)
      var c = {
            placement: 'bottom',
            orderedModifiers: [],
            options: Object.assign({}, Xa, o),
            modifiersData: {},
            elements: { reference: a, popper: l },
            attributes: {},
            styles: {},
         },
         d = [],
         p = !1,
         _ = {
            state: c,
            setOptions: function (N) {
               var P = typeof N == 'function' ? N(c.options) : N
               E(),
                  (c.options = Object.assign({}, o, c.options, P)),
                  (c.scrollParents = {
                     reference: ln(a)
                        ? is(a)
                        : a.contextElement
                        ? is(a.contextElement)
                        : [],
                     popper: is(l),
                  })
               var M = cE(fE([].concat(s, c.options.modifiers)))
               return (
                  (c.orderedModifiers = M.filter(function (C) {
                     return C.enabled
                  })),
                  g(),
                  _.update()
               )
            },
            forceUpdate: function () {
               if (!p) {
                  var N = c.elements,
                     P = N.reference,
                     M = N.popper
                  if (Qa(P, M)) {
                     ;(c.rects = {
                        reference: aE(P, Es(M), c.options.strategy === 'fixed'),
                        popper: bi(M),
                     }),
                        (c.reset = !1),
                        (c.placement = c.options.placement),
                        c.orderedModifiers.forEach(function (re) {
                           return (c.modifiersData[re.name] = Object.assign(
                              {},
                              re.data
                           ))
                        })
                     for (var C = 0; C < c.orderedModifiers.length; C++) {
                        if (c.reset === !0) {
                           ;(c.reset = !1), (C = -1)
                           continue
                        }
                        var U = c.orderedModifiers[C],
                           K = U.fn,
                           Q = U.options,
                           ce = Q === void 0 ? {} : Q,
                           fe = U.name
                        typeof K == 'function' &&
                           (c =
                              K({
                                 state: c,
                                 options: ce,
                                 name: fe,
                                 instance: _,
                              }) || c)
                     }
                  }
               }
            },
            update: uE(function () {
               return new Promise(function (O) {
                  _.forceUpdate(), O(c)
               })
            }),
            destroy: function () {
               E(), (p = !0)
            },
         }
      if (!Qa(a, l)) return _
      _.setOptions(u).then(function (O) {
         !p && u.onFirstUpdate && u.onFirstUpdate(O)
      })
      function g() {
         c.orderedModifiers.forEach(function (O) {
            var N = O.name,
               P = O.options,
               M = P === void 0 ? {} : P,
               C = O.effect
            if (typeof C == 'function') {
               var U = C({ state: c, name: N, instance: _, options: M }),
                  K = function () {}
               d.push(U || K)
            }
         })
      }
      function E() {
         d.forEach(function (O) {
            return O()
         }),
            (d = [])
      }
      return _
   }
}
var dE = Pr(),
   hE = [Ti, Ci, wi, vi],
   pE = Pr({ defaultModifiers: hE }),
   mE = [Ti, Ci, wi, vi, xu, Cu, Ru, Au, Nu],
   Ni = Pr({ defaultModifiers: mE })
const Pu = Object.freeze(
   Object.defineProperty(
      {
         __proto__: null,
         afterMain: pu,
         afterRead: fu,
         afterWrite: gu,
         applyStyles: vi,
         arrow: Au,
         auto: xr,
         basePlacements: jn,
         beforeMain: du,
         beforeRead: cu,
         beforeWrite: mu,
         bottom: je,
         clippingParents: au,
         computeStyles: wi,
         createPopper: Ni,
         createPopperBase: dE,
         createPopperLite: pE,
         detectOverflow: In,
         end: kn,
         eventListeners: Ti,
         flip: Cu,
         hide: Nu,
         left: xe,
         main: hu,
         modifierPhases: Eu,
         offset: xu,
         placements: gi,
         popper: gn,
         popperGenerator: Pr,
         popperOffsets: Ci,
         preventOverflow: Ru,
         read: uu,
         reference: lu,
         right: Ue,
         start: an,
         top: Ne,
         variationPlacements: Lo,
         viewport: _i,
         write: _u,
      },
      Symbol.toStringTag,
      { value: 'Module' }
   )
)
/*!
 * Bootstrap v5.3.2 (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */ const Dt = new Map(),
   Xr = {
      set(e, t, n) {
         Dt.has(e) || Dt.set(e, new Map())
         const s = Dt.get(e)
         if (!s.has(t) && s.size !== 0) {
            console.error(
               `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                  Array.from(s.keys())[0]
               }.`
            )
            return
         }
         s.set(t, n)
      },
      get(e, t) {
         return (Dt.has(e) && Dt.get(e).get(t)) || null
      },
      remove(e, t) {
         if (!Dt.has(e)) return
         const n = Dt.get(e)
         n.delete(t), n.size === 0 && Dt.delete(e)
      },
   },
   _E = 1e6,
   gE = 1e3,
   Ho = 'transitionend',
   ku = (e) => (
      e &&
         window.CSS &&
         window.CSS.escape &&
         (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)),
      e
   ),
   EE = (e) =>
      e == null
         ? `${e}`
         : Object.prototype.toString
              .call(e)
              .match(/\s([a-z]+)/i)[1]
              .toLowerCase(),
   vE = (e) => {
      do e += Math.floor(Math.random() * _E)
      while (document.getElementById(e))
      return e
   },
   bE = (e) => {
      if (!e) return 0
      let { transitionDuration: t, transitionDelay: n } =
         window.getComputedStyle(e)
      const s = Number.parseFloat(t),
         r = Number.parseFloat(n)
      return !s && !r
         ? 0
         : ((t = t.split(',')[0]),
           (n = n.split(',')[0]),
           (Number.parseFloat(t) + Number.parseFloat(n)) * gE)
   },
   Du = (e) => {
      e.dispatchEvent(new Event(Ho))
   },
   St = (e) =>
      !e || typeof e != 'object'
         ? !1
         : (typeof e.jquery < 'u' && (e = e[0]), typeof e.nodeType < 'u'),
   Ft = (e) =>
      St(e)
         ? e.jquery
            ? e[0]
            : e
         : typeof e == 'string' && e.length > 0
         ? document.querySelector(ku(e))
         : null,
   Un = (e) => {
      if (!St(e) || e.getClientRects().length === 0) return !1
      const t =
            getComputedStyle(e).getPropertyValue('visibility') === 'visible',
         n = e.closest('details:not([open])')
      if (!n) return t
      if (n !== e) {
         const s = e.closest('summary')
         if ((s && s.parentNode !== n) || s === null) return !1
      }
      return t
   },
   Wt = (e) =>
      !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains('disabled')
         ? !0
         : typeof e.disabled < 'u'
         ? e.disabled
         : e.hasAttribute('disabled') && e.getAttribute('disabled') !== 'false',
   $u = (e) => {
      if (!document.documentElement.attachShadow) return null
      if (typeof e.getRootNode == 'function') {
         const t = e.getRootNode()
         return t instanceof ShadowRoot ? t : null
      }
      return e instanceof ShadowRoot
         ? e
         : e.parentNode
         ? $u(e.parentNode)
         : null
   },
   nr = () => {},
   vs = (e) => {
      e.offsetHeight
   },
   Lu = () =>
      window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')
         ? window.jQuery
         : null,
   Qr = [],
   yE = (e) => {
      document.readyState === 'loading'
         ? (Qr.length ||
              document.addEventListener('DOMContentLoaded', () => {
                 for (const t of Qr) t()
              }),
           Qr.push(e))
         : e()
   },
   Ge = () => document.documentElement.dir === 'rtl',
   Xe = (e) => {
      yE(() => {
         const t = Lu()
         if (t) {
            const n = e.NAME,
               s = t.fn[n]
            ;(t.fn[n] = e.jQueryInterface),
               (t.fn[n].Constructor = e),
               (t.fn[n].noConflict = () => ((t.fn[n] = s), e.jQueryInterface))
         }
      })
   },
   $e = (e, t = [], n = e) => (typeof e == 'function' ? e(...t) : n),
   Iu = (e, t, n = !0) => {
      if (!n) {
         $e(e)
         return
      }
      const s = 5,
         r = bE(t) + s
      let o = !1
      const i = ({ target: a }) => {
         a === t && ((o = !0), t.removeEventListener(Ho, i), $e(e))
      }
      t.addEventListener(Ho, i),
         setTimeout(() => {
            o || Du(t)
         }, r)
   },
   xi = (e, t, n, s) => {
      const r = e.length
      let o = e.indexOf(t)
      return o === -1
         ? !n && s
            ? e[r - 1]
            : e[0]
         : ((o += n ? 1 : -1),
           s && (o = (o + r) % r),
           e[Math.max(0, Math.min(o, r - 1))])
   },
   wE = /[^.]*(?=\..*)\.|.*/,
   TE = /\..*/,
   AE = /::\d+$/,
   Zr = {}
let Za = 1
const Mu = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
   SE = new Set([
      'click',
      'dblclick',
      'mouseup',
      'mousedown',
      'contextmenu',
      'mousewheel',
      'DOMMouseScroll',
      'mouseover',
      'mouseout',
      'mousemove',
      'selectstart',
      'selectend',
      'keydown',
      'keypress',
      'keyup',
      'orientationchange',
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel',
      'pointerdown',
      'pointermove',
      'pointerup',
      'pointerleave',
      'pointercancel',
      'gesturestart',
      'gesturechange',
      'gestureend',
      'focus',
      'blur',
      'change',
      'reset',
      'select',
      'submit',
      'focusin',
      'focusout',
      'load',
      'unload',
      'beforeunload',
      'resize',
      'move',
      'DOMContentLoaded',
      'readystatechange',
      'error',
      'abort',
      'scroll',
   ])
function Hu(e, t) {
   return (t && `${t}::${Za++}`) || e.uidEvent || Za++
}
function Fu(e) {
   const t = Hu(e)
   return (e.uidEvent = t), (Zr[t] = Zr[t] || {}), Zr[t]
}
function OE(e, t) {
   return function n(s) {
      return (
         Ri(s, { delegateTarget: e }),
         n.oneOff && A.off(e, s.type, t),
         t.apply(e, [s])
      )
   }
}
function CE(e, t, n) {
   return function s(r) {
      const o = e.querySelectorAll(t)
      for (let { target: i } = r; i && i !== this; i = i.parentNode)
         for (const a of o)
            if (a === i)
               return (
                  Ri(r, { delegateTarget: i }),
                  s.oneOff && A.off(e, r.type, t, n),
                  n.apply(i, [r])
               )
   }
}
function Wu(e, t, n = null) {
   return Object.values(e).find(
      (s) => s.callable === t && s.delegationSelector === n
   )
}
function Vu(e, t, n) {
   const s = typeof t == 'string',
      r = s ? n : t || n
   let o = Bu(e)
   return SE.has(o) || (o = e), [s, r, o]
}
function el(e, t, n, s, r) {
   if (typeof t != 'string' || !e) return
   let [o, i, a] = Vu(t, n, s)
   t in Mu &&
      (i = ((g) =>
         function (E) {
            if (
               !E.relatedTarget ||
               (E.relatedTarget !== E.delegateTarget &&
                  !E.delegateTarget.contains(E.relatedTarget))
            )
               return g.call(this, E)
         })(i))
   const l = Fu(e),
      u = l[a] || (l[a] = {}),
      c = Wu(u, i, o ? n : null)
   if (c) {
      c.oneOff = c.oneOff && r
      return
   }
   const d = Hu(i, t.replace(wE, '')),
      p = o ? CE(e, n, i) : OE(e, i)
   ;(p.delegationSelector = o ? n : null),
      (p.callable = i),
      (p.oneOff = r),
      (p.uidEvent = d),
      (u[d] = p),
      e.addEventListener(a, p, o)
}
function Fo(e, t, n, s, r) {
   const o = Wu(t[n], s, r)
   o && (e.removeEventListener(n, o, !!r), delete t[n][o.uidEvent])
}
function NE(e, t, n, s) {
   const r = t[n] || {}
   for (const [o, i] of Object.entries(r))
      o.includes(s) && Fo(e, t, n, i.callable, i.delegationSelector)
}
function Bu(e) {
   return (e = e.replace(TE, '')), Mu[e] || e
}
const A = {
   on(e, t, n, s) {
      el(e, t, n, s, !1)
   },
   one(e, t, n, s) {
      el(e, t, n, s, !0)
   },
   off(e, t, n, s) {
      if (typeof t != 'string' || !e) return
      const [r, o, i] = Vu(t, n, s),
         a = i !== t,
         l = Fu(e),
         u = l[i] || {},
         c = t.startsWith('.')
      if (typeof o < 'u') {
         if (!Object.keys(u).length) return
         Fo(e, l, i, o, r ? n : null)
         return
      }
      if (c) for (const d of Object.keys(l)) NE(e, l, d, t.slice(1))
      for (const [d, p] of Object.entries(u)) {
         const _ = d.replace(AE, '')
         ;(!a || t.includes(_)) && Fo(e, l, i, p.callable, p.delegationSelector)
      }
   },
   trigger(e, t, n) {
      if (typeof t != 'string' || !e) return null
      const s = Lu(),
         r = Bu(t),
         o = t !== r
      let i = null,
         a = !0,
         l = !0,
         u = !1
      o &&
         s &&
         ((i = s.Event(t, n)),
         s(e).trigger(i),
         (a = !i.isPropagationStopped()),
         (l = !i.isImmediatePropagationStopped()),
         (u = i.isDefaultPrevented()))
      const c = Ri(new Event(t, { bubbles: a, cancelable: !0 }), n)
      return (
         u && c.preventDefault(),
         l && e.dispatchEvent(c),
         c.defaultPrevented && i && i.preventDefault(),
         c
      )
   },
}
function Ri(e, t = {}) {
   for (const [n, s] of Object.entries(t))
      try {
         e[n] = s
      } catch {
         Object.defineProperty(e, n, {
            configurable: !0,
            get() {
               return s
            },
         })
      }
   return e
}
function tl(e) {
   if (e === 'true') return !0
   if (e === 'false') return !1
   if (e === Number(e).toString()) return Number(e)
   if (e === '' || e === 'null') return null
   if (typeof e != 'string') return e
   try {
      return JSON.parse(decodeURIComponent(e))
   } catch {
      return e
   }
}
function eo(e) {
   return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`)
}
const Ot = {
   setDataAttribute(e, t, n) {
      e.setAttribute(`data-bs-${eo(t)}`, n)
   },
   removeDataAttribute(e, t) {
      e.removeAttribute(`data-bs-${eo(t)}`)
   },
   getDataAttributes(e) {
      if (!e) return {}
      const t = {},
         n = Object.keys(e.dataset).filter(
            (s) => s.startsWith('bs') && !s.startsWith('bsConfig')
         )
      for (const s of n) {
         let r = s.replace(/^bs/, '')
         ;(r = r.charAt(0).toLowerCase() + r.slice(1, r.length)),
            (t[r] = tl(e.dataset[s]))
      }
      return t
   },
   getDataAttribute(e, t) {
      return tl(e.getAttribute(`data-bs-${eo(t)}`))
   },
}
class bs {
   static get Default() {
      return {}
   }
   static get DefaultType() {
      return {}
   }
   static get NAME() {
      throw new Error(
         'You have to implement the static method "NAME", for each component!'
      )
   }
   _getConfig(t) {
      return (
         (t = this._mergeConfigObj(t)),
         (t = this._configAfterMerge(t)),
         this._typeCheckConfig(t),
         t
      )
   }
   _configAfterMerge(t) {
      return t
   }
   _mergeConfigObj(t, n) {
      const s = St(n) ? Ot.getDataAttribute(n, 'config') : {}
      return {
         ...this.constructor.Default,
         ...(typeof s == 'object' ? s : {}),
         ...(St(n) ? Ot.getDataAttributes(n) : {}),
         ...(typeof t == 'object' ? t : {}),
      }
   }
   _typeCheckConfig(t, n = this.constructor.DefaultType) {
      for (const [s, r] of Object.entries(n)) {
         const o = t[s],
            i = St(o) ? 'element' : EE(o)
         if (!new RegExp(r).test(i))
            throw new TypeError(
               `${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${i}" but expected type "${r}".`
            )
      }
   }
}
const xE = '5.3.2'
class at extends bs {
   constructor(t, n) {
      super(),
         (t = Ft(t)),
         t &&
            ((this._element = t),
            (this._config = this._getConfig(n)),
            Xr.set(this._element, this.constructor.DATA_KEY, this))
   }
   dispose() {
      Xr.remove(this._element, this.constructor.DATA_KEY),
         A.off(this._element, this.constructor.EVENT_KEY)
      for (const t of Object.getOwnPropertyNames(this)) this[t] = null
   }
   _queueCallback(t, n, s = !0) {
      Iu(t, n, s)
   }
   _getConfig(t) {
      return (
         (t = this._mergeConfigObj(t, this._element)),
         (t = this._configAfterMerge(t)),
         this._typeCheckConfig(t),
         t
      )
   }
   static getInstance(t) {
      return Xr.get(Ft(t), this.DATA_KEY)
   }
   static getOrCreateInstance(t, n = {}) {
      return this.getInstance(t) || new this(t, typeof n == 'object' ? n : null)
   }
   static get VERSION() {
      return xE
   }
   static get DATA_KEY() {
      return `bs.${this.NAME}`
   }
   static get EVENT_KEY() {
      return `.${this.DATA_KEY}`
   }
   static eventName(t) {
      return `${t}${this.EVENT_KEY}`
   }
}
const to = (e) => {
      let t = e.getAttribute('data-bs-target')
      if (!t || t === '#') {
         let n = e.getAttribute('href')
         if (!n || (!n.includes('#') && !n.startsWith('.'))) return null
         n.includes('#') && !n.startsWith('#') && (n = `#${n.split('#')[1]}`),
            (t = n && n !== '#' ? ku(n.trim()) : null)
      }
      return t
   },
   V = {
      find(e, t = document.documentElement) {
         return [].concat(...Element.prototype.querySelectorAll.call(t, e))
      },
      findOne(e, t = document.documentElement) {
         return Element.prototype.querySelector.call(t, e)
      },
      children(e, t) {
         return [].concat(...e.children).filter((n) => n.matches(t))
      },
      parents(e, t) {
         const n = []
         let s = e.parentNode.closest(t)
         for (; s; ) n.push(s), (s = s.parentNode.closest(t))
         return n
      },
      prev(e, t) {
         let n = e.previousElementSibling
         for (; n; ) {
            if (n.matches(t)) return [n]
            n = n.previousElementSibling
         }
         return []
      },
      next(e, t) {
         let n = e.nextElementSibling
         for (; n; ) {
            if (n.matches(t)) return [n]
            n = n.nextElementSibling
         }
         return []
      },
      focusableChildren(e) {
         const t = [
            'a',
            'button',
            'input',
            'textarea',
            'select',
            'details',
            '[tabindex]',
            '[contenteditable="true"]',
         ]
            .map((n) => `${n}:not([tabindex^="-"])`)
            .join(',')
         return this.find(t, e).filter((n) => !Wt(n) && Un(n))
      },
      getSelectorFromElement(e) {
         const t = to(e)
         return t && V.findOne(t) ? t : null
      },
      getElementFromSelector(e) {
         const t = to(e)
         return t ? V.findOne(t) : null
      },
      getMultipleElementsFromSelector(e) {
         const t = to(e)
         return t ? V.find(t) : []
      },
   },
   kr = (e, t = 'hide') => {
      const n = `click.dismiss${e.EVENT_KEY}`,
         s = e.NAME
      A.on(document, n, `[data-bs-dismiss="${s}"]`, function (r) {
         if (
            (['A', 'AREA'].includes(this.tagName) && r.preventDefault(),
            Wt(this))
         )
            return
         const o = V.getElementFromSelector(this) || this.closest(`.${s}`)
         e.getOrCreateInstance(o)[t]()
      })
   },
   RE = 'alert',
   PE = 'bs.alert',
   ju = `.${PE}`,
   kE = `close${ju}`,
   DE = `closed${ju}`,
   $E = 'fade',
   LE = 'show'
class Dr extends at {
   static get NAME() {
      return RE
   }
   close() {
      if (A.trigger(this._element, kE).defaultPrevented) return
      this._element.classList.remove(LE)
      const n = this._element.classList.contains($E)
      this._queueCallback(() => this._destroyElement(), this._element, n)
   }
   _destroyElement() {
      this._element.remove(), A.trigger(this._element, DE), this.dispose()
   }
   static jQueryInterface(t) {
      return this.each(function () {
         const n = Dr.getOrCreateInstance(this)
         if (typeof t == 'string') {
            if (n[t] === void 0 || t.startsWith('_') || t === 'constructor')
               throw new TypeError(`No method named "${t}"`)
            n[t](this)
         }
      })
   }
}
kr(Dr, 'close')
Xe(Dr)
const IE = 'button',
   ME = 'bs.button',
   HE = `.${ME}`,
   FE = '.data-api',
   WE = 'active',
   nl = '[data-bs-toggle="button"]',
   VE = `click${HE}${FE}`
class $r extends at {
   static get NAME() {
      return IE
   }
   toggle() {
      this._element.setAttribute(
         'aria-pressed',
         this._element.classList.toggle(WE)
      )
   }
   static jQueryInterface(t) {
      return this.each(function () {
         const n = $r.getOrCreateInstance(this)
         t === 'toggle' && n[t]()
      })
   }
}
A.on(document, VE, nl, (e) => {
   e.preventDefault()
   const t = e.target.closest(nl)
   $r.getOrCreateInstance(t).toggle()
})
Xe($r)
const BE = 'swipe',
   Kn = '.bs.swipe',
   jE = `touchstart${Kn}`,
   UE = `touchmove${Kn}`,
   KE = `touchend${Kn}`,
   zE = `pointerdown${Kn}`,
   qE = `pointerup${Kn}`,
   YE = 'touch',
   GE = 'pen',
   JE = 'pointer-event',
   XE = 40,
   QE = { endCallback: null, leftCallback: null, rightCallback: null },
   ZE = {
      endCallback: '(function|null)',
      leftCallback: '(function|null)',
      rightCallback: '(function|null)',
   }
class sr extends bs {
   constructor(t, n) {
      super(),
         (this._element = t),
         !(!t || !sr.isSupported()) &&
            ((this._config = this._getConfig(n)),
            (this._deltaX = 0),
            (this._supportPointerEvents = !!window.PointerEvent),
            this._initEvents())
   }
   static get Default() {
      return QE
   }
   static get DefaultType() {
      return ZE
   }
   static get NAME() {
      return BE
   }
   dispose() {
      A.off(this._element, Kn)
   }
   _start(t) {
      if (!this._supportPointerEvents) {
         this._deltaX = t.touches[0].clientX
         return
      }
      this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX)
   }
   _end(t) {
      this._eventIsPointerPenTouch(t) &&
         (this._deltaX = t.clientX - this._deltaX),
         this._handleSwipe(),
         $e(this._config.endCallback)
   }
   _move(t) {
      this._deltaX =
         t.touches && t.touches.length > 1
            ? 0
            : t.touches[0].clientX - this._deltaX
   }
   _handleSwipe() {
      const t = Math.abs(this._deltaX)
      if (t <= XE) return
      const n = t / this._deltaX
      ;(this._deltaX = 0),
         n && $e(n > 0 ? this._config.rightCallback : this._config.leftCallback)
   }
   _initEvents() {
      this._supportPointerEvents
         ? (A.on(this._element, zE, (t) => this._start(t)),
           A.on(this._element, qE, (t) => this._end(t)),
           this._element.classList.add(JE))
         : (A.on(this._element, jE, (t) => this._start(t)),
           A.on(this._element, UE, (t) => this._move(t)),
           A.on(this._element, KE, (t) => this._end(t)))
   }
   _eventIsPointerPenTouch(t) {
      return (
         this._supportPointerEvents &&
         (t.pointerType === GE || t.pointerType === YE)
      )
   }
   static isSupported() {
      return (
         'ontouchstart' in document.documentElement ||
         navigator.maxTouchPoints > 0
      )
   }
}
const ev = 'carousel',
   tv = 'bs.carousel',
   jt = `.${tv}`,
   Uu = '.data-api',
   nv = 'ArrowLeft',
   sv = 'ArrowRight',
   rv = 500,
   Xn = 'next',
   hn = 'prev',
   En = 'left',
   zs = 'right',
   ov = `slide${jt}`,
   no = `slid${jt}`,
   iv = `keydown${jt}`,
   av = `mouseenter${jt}`,
   lv = `mouseleave${jt}`,
   cv = `dragstart${jt}`,
   uv = `load${jt}${Uu}`,
   fv = `click${jt}${Uu}`,
   Ku = 'carousel',
   Rs = 'active',
   dv = 'slide',
   hv = 'carousel-item-end',
   pv = 'carousel-item-start',
   mv = 'carousel-item-next',
   _v = 'carousel-item-prev',
   zu = '.active',
   qu = '.carousel-item',
   gv = zu + qu,
   Ev = '.carousel-item img',
   vv = '.carousel-indicators',
   bv = '[data-bs-slide], [data-bs-slide-to]',
   yv = '[data-bs-ride="carousel"]',
   wv = { [nv]: zs, [sv]: En },
   Tv = {
      interval: 5e3,
      keyboard: !0,
      pause: 'hover',
      ride: !1,
      touch: !0,
      wrap: !0,
   },
   Av = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      pause: '(string|boolean)',
      ride: '(boolean|string)',
      touch: 'boolean',
      wrap: 'boolean',
   }
class ys extends at {
   constructor(t, n) {
      super(t, n),
         (this._interval = null),
         (this._activeElement = null),
         (this._isSliding = !1),
         (this.touchTimeout = null),
         (this._swipeHelper = null),
         (this._indicatorsElement = V.findOne(vv, this._element)),
         this._addEventListeners(),
         this._config.ride === Ku && this.cycle()
   }
   static get Default() {
      return Tv
   }
   static get DefaultType() {
      return Av
   }
   static get NAME() {
      return ev
   }
   next() {
      this._slide(Xn)
   }
   nextWhenVisible() {
      !document.hidden && Un(this._element) && this.next()
   }
   prev() {
      this._slide(hn)
   }
   pause() {
      this._isSliding && Du(this._element), this._clearInterval()
   }
   cycle() {
      this._clearInterval(),
         this._updateInterval(),
         (this._interval = setInterval(
            () => this.nextWhenVisible(),
            this._config.interval
         ))
   }
   _maybeEnableCycle() {
      if (this._config.ride) {
         if (this._isSliding) {
            A.one(this._element, no, () => this.cycle())
            return
         }
         this.cycle()
      }
   }
   to(t) {
      const n = this._getItems()
      if (t > n.length - 1 || t < 0) return
      if (this._isSliding) {
         A.one(this._element, no, () => this.to(t))
         return
      }
      const s = this._getItemIndex(this._getActive())
      if (s === t) return
      const r = t > s ? Xn : hn
      this._slide(r, n[t])
   }
   dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
   }
   _configAfterMerge(t) {
      return (t.defaultInterval = t.interval), t
   }
   _addEventListeners() {
      this._config.keyboard && A.on(this._element, iv, (t) => this._keydown(t)),
         this._config.pause === 'hover' &&
            (A.on(this._element, av, () => this.pause()),
            A.on(this._element, lv, () => this._maybeEnableCycle())),
         this._config.touch &&
            sr.isSupported() &&
            this._addTouchEventListeners()
   }
   _addTouchEventListeners() {
      for (const s of V.find(Ev, this._element))
         A.on(s, cv, (r) => r.preventDefault())
      const n = {
         leftCallback: () => this._slide(this._directionToOrder(En)),
         rightCallback: () => this._slide(this._directionToOrder(zs)),
         endCallback: () => {
            this._config.pause === 'hover' &&
               (this.pause(),
               this.touchTimeout && clearTimeout(this.touchTimeout),
               (this.touchTimeout = setTimeout(
                  () => this._maybeEnableCycle(),
                  rv + this._config.interval
               )))
         },
      }
      this._swipeHelper = new sr(this._element, n)
   }
   _keydown(t) {
      if (/input|textarea/i.test(t.target.tagName)) return
      const n = wv[t.key]
      n && (t.preventDefault(), this._slide(this._directionToOrder(n)))
   }
   _getItemIndex(t) {
      return this._getItems().indexOf(t)
   }
   _setActiveIndicatorElement(t) {
      if (!this._indicatorsElement) return
      const n = V.findOne(zu, this._indicatorsElement)
      n.classList.remove(Rs), n.removeAttribute('aria-current')
      const s = V.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement)
      s && (s.classList.add(Rs), s.setAttribute('aria-current', 'true'))
   }
   _updateInterval() {
      const t = this._activeElement || this._getActive()
      if (!t) return
      const n = Number.parseInt(t.getAttribute('data-bs-interval'), 10)
      this._config.interval = n || this._config.defaultInterval
   }
   _slide(t, n = null) {
      if (this._isSliding) return
      const s = this._getActive(),
         r = t === Xn,
         o = n || xi(this._getItems(), s, r, this._config.wrap)
      if (o === s) return
      const i = this._getItemIndex(o),
         a = (_) =>
            A.trigger(this._element, _, {
               relatedTarget: o,
               direction: this._orderToDirection(t),
               from: this._getItemIndex(s),
               to: i,
            })
      if (a(ov).defaultPrevented || !s || !o) return
      const u = !!this._interval
      this.pause(),
         (this._isSliding = !0),
         this._setActiveIndicatorElement(i),
         (this._activeElement = o)
      const c = r ? pv : hv,
         d = r ? mv : _v
      o.classList.add(d), vs(o), s.classList.add(c), o.classList.add(c)
      const p = () => {
         o.classList.remove(c, d),
            o.classList.add(Rs),
            s.classList.remove(Rs, d, c),
            (this._isSliding = !1),
            a(no)
      }
      this._queueCallback(p, s, this._isAnimated()), u && this.cycle()
   }
   _isAnimated() {
      return this._element.classList.contains(dv)
   }
   _getActive() {
      return V.findOne(gv, this._element)
   }
   _getItems() {
      return V.find(qu, this._element)
   }
   _clearInterval() {
      this._interval && (clearInterval(this._interval), (this._interval = null))
   }
   _directionToOrder(t) {
      return Ge() ? (t === En ? hn : Xn) : t === En ? Xn : hn
   }
   _orderToDirection(t) {
      return Ge() ? (t === hn ? En : zs) : t === hn ? zs : En
   }
   static jQueryInterface(t) {
      return this.each(function () {
         const n = ys.getOrCreateInstance(this, t)
         if (typeof t == 'number') {
            n.to(t)
            return
         }
         if (typeof t == 'string') {
            if (n[t] === void 0 || t.startsWith('_') || t === 'constructor')
               throw new TypeError(`No method named "${t}"`)
            n[t]()
         }
      })
   }
}
A.on(document, fv, bv, function (e) {
   const t = V.getElementFromSelector(this)
   if (!t || !t.classList.contains(Ku)) return
   e.preventDefault()
   const n = ys.getOrCreateInstance(t),
      s = this.getAttribute('data-bs-slide-to')
   if (s) {
      n.to(s), n._maybeEnableCycle()
      return
   }
   if (Ot.getDataAttribute(this, 'slide') === 'next') {
      n.next(), n._maybeEnableCycle()
      return
   }
   n.prev(), n._maybeEnableCycle()
})
A.on(window, uv, () => {
   const e = V.find(yv)
   for (const t of e) ys.getOrCreateInstance(t)
})
Xe(ys)
const Sv = 'collapse',
   Ov = 'bs.collapse',
   ws = `.${Ov}`,
   Cv = '.data-api',
   Nv = `show${ws}`,
   xv = `shown${ws}`,
   Rv = `hide${ws}`,
   Pv = `hidden${ws}`,
   kv = `click${ws}${Cv}`,
   so = 'show',
   bn = 'collapse',
   Ps = 'collapsing',
   Dv = 'collapsed',
   $v = `:scope .${bn} .${bn}`,
   Lv = 'collapse-horizontal',
   Iv = 'width',
   Mv = 'height',
   Hv = '.collapse.show, .collapse.collapsing',
   Wo = '[data-bs-toggle="collapse"]',
   Fv = { parent: null, toggle: !0 },
   Wv = { parent: '(null|element)', toggle: 'boolean' }
class ps extends at {
   constructor(t, n) {
      super(t, n), (this._isTransitioning = !1), (this._triggerArray = [])
      const s = V.find(Wo)
      for (const r of s) {
         const o = V.getSelectorFromElement(r),
            i = V.find(o).filter((a) => a === this._element)
         o !== null && i.length && this._triggerArray.push(r)
      }
      this._initializeChildren(),
         this._config.parent ||
            this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
         this._config.toggle && this.toggle()
   }
   static get Default() {
      return Fv
   }
   static get DefaultType() {
      return Wv
   }
   static get NAME() {
      return Sv
   }
   toggle() {
      this._isShown() ? this.hide() : this.show()
   }
   show() {
      if (this._isTransitioning || this._isShown()) return
      let t = []
      if (
         (this._config.parent &&
            (t = this._getFirstLevelChildren(Hv)
               .filter((a) => a !== this._element)
               .map((a) => ps.getOrCreateInstance(a, { toggle: !1 }))),
         (t.length && t[0]._isTransitioning) ||
            A.trigger(this._element, Nv).defaultPrevented)
      )
         return
      for (const a of t) a.hide()
      const s = this._getDimension()
      this._element.classList.remove(bn),
         this._element.classList.add(Ps),
         (this._element.style[s] = 0),
         this._addAriaAndCollapsedClass(this._triggerArray, !0),
         (this._isTransitioning = !0)
      const r = () => {
            ;(this._isTransitioning = !1),
               this._element.classList.remove(Ps),
               this._element.classList.add(bn, so),
               (this._element.style[s] = ''),
               A.trigger(this._element, xv)
         },
         i = `scroll${s[0].toUpperCase() + s.slice(1)}`
      this._queueCallback(r, this._element, !0),
         (this._element.style[s] = `${this._element[i]}px`)
   }
   hide() {
      if (
         this._isTransitioning ||
         !this._isShown() ||
         A.trigger(this._element, Rv).defaultPrevented
      )
         return
      const n = this._getDimension()
      ;(this._element.style[n] = `${
         this._element.getBoundingClientRect()[n]
      }px`),
         vs(this._element),
         this._element.classList.add(Ps),
         this._element.classList.remove(bn, so)
      for (const r of this._triggerArray) {
         const o = V.getElementFromSelector(r)
         o && !this._isShown(o) && this._addAriaAndCollapsedClass([r], !1)
      }
      this._isTransitioning = !0
      const s = () => {
         ;(this._isTransitioning = !1),
            this._element.classList.remove(Ps),
            this._element.classList.add(bn),
            A.trigger(this._element, Pv)
      }
      ;(this._element.style[n] = ''), this._queueCallback(s, this._element, !0)
   }
   _isShown(t = this._element) {
      return t.classList.contains(so)
   }
   _configAfterMerge(t) {
      return (t.toggle = !!t.toggle), (t.parent = Ft(t.parent)), t
   }
   _getDimension() {
      return this._element.classList.contains(Lv) ? Iv : Mv
   }
   _initializeChildren() {
      if (!this._config.parent) return
      const t = this._getFirstLevelChildren(Wo)
      for (const n of t) {
         const s = V.getElementFromSelector(n)
         s && this._addAriaAndCollapsedClass([n], this._isShown(s))
      }
   }
   _getFirstLevelChildren(t) {
      const n = V.find($v, this._config.parent)
      return V.find(t, this._config.parent).filter((s) => !n.includes(s))
   }
   _addAriaAndCollapsedClass(t, n) {
      if (t.length)
         for (const s of t)
            s.classList.toggle(Dv, !n), s.setAttribute('aria-expanded', n)
   }
   static jQueryInterface(t) {
      const n = {}
      return (
         typeof t == 'string' && /show|hide/.test(t) && (n.toggle = !1),
         this.each(function () {
            const s = ps.getOrCreateInstance(this, n)
            if (typeof t == 'string') {
               if (typeof s[t] > 'u')
                  throw new TypeError(`No method named "${t}"`)
               s[t]()
            }
         })
      )
   }
}
A.on(document, kv, Wo, function (e) {
   ;(e.target.tagName === 'A' ||
      (e.delegateTarget && e.delegateTarget.tagName === 'A')) &&
      e.preventDefault()
   for (const t of V.getMultipleElementsFromSelector(this))
      ps.getOrCreateInstance(t, { toggle: !1 }).toggle()
})
Xe(ps)
const sl = 'dropdown',
   Vv = 'bs.dropdown',
   cn = `.${Vv}`,
   Pi = '.data-api',
   Bv = 'Escape',
   rl = 'Tab',
   jv = 'ArrowUp',
   ol = 'ArrowDown',
   Uv = 2,
   Kv = `hide${cn}`,
   zv = `hidden${cn}`,
   qv = `show${cn}`,
   Yv = `shown${cn}`,
   Yu = `click${cn}${Pi}`,
   Gu = `keydown${cn}${Pi}`,
   Gv = `keyup${cn}${Pi}`,
   vn = 'show',
   Jv = 'dropup',
   Xv = 'dropend',
   Qv = 'dropstart',
   Zv = 'dropup-center',
   eb = 'dropdown-center',
   Qt = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
   tb = `${Qt}.${vn}`,
   qs = '.dropdown-menu',
   nb = '.navbar',
   sb = '.navbar-nav',
   rb = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)',
   ob = Ge() ? 'top-end' : 'top-start',
   ib = Ge() ? 'top-start' : 'top-end',
   ab = Ge() ? 'bottom-end' : 'bottom-start',
   lb = Ge() ? 'bottom-start' : 'bottom-end',
   cb = Ge() ? 'left-start' : 'right-start',
   ub = Ge() ? 'right-start' : 'left-start',
   fb = 'top',
   db = 'bottom',
   hb = {
      autoClose: !0,
      boundary: 'clippingParents',
      display: 'dynamic',
      offset: [0, 2],
      popperConfig: null,
      reference: 'toggle',
   },
   pb = {
      autoClose: '(boolean|string)',
      boundary: '(string|element)',
      display: 'string',
      offset: '(array|string|function)',
      popperConfig: '(null|object|function)',
      reference: '(string|element|object)',
   }
class pt extends at {
   constructor(t, n) {
      super(t, n),
         (this._popper = null),
         (this._parent = this._element.parentNode),
         (this._menu =
            V.next(this._element, qs)[0] ||
            V.prev(this._element, qs)[0] ||
            V.findOne(qs, this._parent)),
         (this._inNavbar = this._detectNavbar())
   }
   static get Default() {
      return hb
   }
   static get DefaultType() {
      return pb
   }
   static get NAME() {
      return sl
   }
   toggle() {
      return this._isShown() ? this.hide() : this.show()
   }
   show() {
      if (Wt(this._element) || this._isShown()) return
      const t = { relatedTarget: this._element }
      if (!A.trigger(this._element, qv, t).defaultPrevented) {
         if (
            (this._createPopper(),
            'ontouchstart' in document.documentElement &&
               !this._parent.closest(sb))
         )
            for (const s of [].concat(...document.body.children))
               A.on(s, 'mouseover', nr)
         this._element.focus(),
            this._element.setAttribute('aria-expanded', !0),
            this._menu.classList.add(vn),
            this._element.classList.add(vn),
            A.trigger(this._element, Yv, t)
      }
   }
   hide() {
      if (Wt(this._element) || !this._isShown()) return
      const t = { relatedTarget: this._element }
      this._completeHide(t)
   }
   dispose() {
      this._popper && this._popper.destroy(), super.dispose()
   }
   update() {
      ;(this._inNavbar = this._detectNavbar()),
         this._popper && this._popper.update()
   }
   _completeHide(t) {
      if (!A.trigger(this._element, Kv, t).defaultPrevented) {
         if ('ontouchstart' in document.documentElement)
            for (const s of [].concat(...document.body.children))
               A.off(s, 'mouseover', nr)
         this._popper && this._popper.destroy(),
            this._menu.classList.remove(vn),
            this._element.classList.remove(vn),
            this._element.setAttribute('aria-expanded', 'false'),
            Ot.removeDataAttribute(this._menu, 'popper'),
            A.trigger(this._element, zv, t)
      }
   }
   _getConfig(t) {
      if (
         ((t = super._getConfig(t)),
         typeof t.reference == 'object' &&
            !St(t.reference) &&
            typeof t.reference.getBoundingClientRect != 'function')
      )
         throw new TypeError(
            `${sl.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
         )
      return t
   }
   _createPopper() {
      if (typeof Pu > 'u')
         throw new TypeError(
            "Bootstrap's dropdowns require Popper (https://popper.js.org)"
         )
      let t = this._element
      this._config.reference === 'parent'
         ? (t = this._parent)
         : St(this._config.reference)
         ? (t = Ft(this._config.reference))
         : typeof this._config.reference == 'object' &&
           (t = this._config.reference)
      const n = this._getPopperConfig()
      this._popper = Ni(t, this._menu, n)
   }
   _isShown() {
      return this._menu.classList.contains(vn)
   }
   _getPlacement() {
      const t = this._parent
      if (t.classList.contains(Xv)) return cb
      if (t.classList.contains(Qv)) return ub
      if (t.classList.contains(Zv)) return fb
      if (t.classList.contains(eb)) return db
      const n =
         getComputedStyle(this._menu)
            .getPropertyValue('--bs-position')
            .trim() === 'end'
      return t.classList.contains(Jv) ? (n ? ib : ob) : n ? lb : ab
   }
   _detectNavbar() {
      return this._element.closest(nb) !== null
   }
   _getOffset() {
      const { offset: t } = this._config
      return typeof t == 'string'
         ? t.split(',').map((n) => Number.parseInt(n, 10))
         : typeof t == 'function'
         ? (n) => t(n, this._element)
         : t
   }
   _getPopperConfig() {
      const t = {
         placement: this._getPlacement(),
         modifiers: [
            {
               name: 'preventOverflow',
               options: { boundary: this._config.boundary },
            },
            { name: 'offset', options: { offset: this._getOffset() } },
         ],
      }
      return (
         (this._inNavbar || this._config.display === 'static') &&
            (Ot.setDataAttribute(this._menu, 'popper', 'static'),
            (t.modifiers = [{ name: 'applyStyles', enabled: !1 }])),
         { ...t, ...$e(this._config.popperConfig, [t]) }
      )
   }
   _selectMenuItem({ key: t, target: n }) {
      const s = V.find(rb, this._menu).filter((r) => Un(r))
      s.length && xi(s, n, t === ol, !s.includes(n)).focus()
   }
   static jQueryInterface(t) {
      return this.each(function () {
         const n = pt.getOrCreateInstance(this, t)
         if (typeof t == 'string') {
            if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`)
            n[t]()
         }
      })
   }
   static clearMenus(t) {
      if (t.button === Uv || (t.type === 'keyup' && t.key !== rl)) return
      const n = V.find(tb)
      for (const s of n) {
         const r = pt.getInstance(s)
         if (!r || r._config.autoClose === !1) continue
         const o = t.composedPath(),
            i = o.includes(r._menu)
         if (
            o.includes(r._element) ||
            (r._config.autoClose === 'inside' && !i) ||
            (r._config.autoClose === 'outside' && i) ||
            (r._menu.contains(t.target) &&
               ((t.type === 'keyup' && t.key === rl) ||
                  /input|select|option|textarea|form/i.test(t.target.tagName)))
         )
            continue
         const a = { relatedTarget: r._element }
         t.type === 'click' && (a.clickEvent = t), r._completeHide(a)
      }
   }
   static dataApiKeydownHandler(t) {
      const n = /input|textarea/i.test(t.target.tagName),
         s = t.key === Bv,
         r = [jv, ol].includes(t.key)
      if ((!r && !s) || (n && !s)) return
      t.preventDefault()
      const o = this.matches(Qt)
            ? this
            : V.prev(this, Qt)[0] ||
              V.next(this, Qt)[0] ||
              V.findOne(Qt, t.delegateTarget.parentNode),
         i = pt.getOrCreateInstance(o)
      if (r) {
         t.stopPropagation(), i.show(), i._selectMenuItem(t)
         return
      }
      i._isShown() && (t.stopPropagation(), i.hide(), o.focus())
   }
}
A.on(document, Gu, Qt, pt.dataApiKeydownHandler)
A.on(document, Gu, qs, pt.dataApiKeydownHandler)
A.on(document, Yu, pt.clearMenus)
A.on(document, Gv, pt.clearMenus)
A.on(document, Yu, Qt, function (e) {
   e.preventDefault(), pt.getOrCreateInstance(this).toggle()
})
Xe(pt)
const Ju = 'backdrop',
   mb = 'fade',
   il = 'show',
   al = `mousedown.bs.${Ju}`,
   _b = {
      className: 'modal-backdrop',
      clickCallback: null,
      isAnimated: !1,
      isVisible: !0,
      rootElement: 'body',
   },
   gb = {
      className: 'string',
      clickCallback: '(function|null)',
      isAnimated: 'boolean',
      isVisible: 'boolean',
      rootElement: '(element|string)',
   }
class Xu extends bs {
   constructor(t) {
      super(),
         (this._config = this._getConfig(t)),
         (this._isAppended = !1),
         (this._element = null)
   }
   static get Default() {
      return _b
   }
   static get DefaultType() {
      return gb
   }
   static get NAME() {
      return Ju
   }
   show(t) {
      if (!this._config.isVisible) {
         $e(t)
         return
      }
      this._append()
      const n = this._getElement()
      this._config.isAnimated && vs(n),
         n.classList.add(il),
         this._emulateAnimation(() => {
            $e(t)
         })
   }
   hide(t) {
      if (!this._config.isVisible) {
         $e(t)
         return
      }
      this._getElement().classList.remove(il),
         this._emulateAnimation(() => {
            this.dispose(), $e(t)
         })
   }
   dispose() {
      this._isAppended &&
         (A.off(this._element, al),
         this._element.remove(),
         (this._isAppended = !1))
   }
   _getElement() {
      if (!this._element) {
         const t = document.createElement('div')
         ;(t.className = this._config.className),
            this._config.isAnimated && t.classList.add(mb),
            (this._element = t)
      }
      return this._element
   }
   _configAfterMerge(t) {
      return (t.rootElement = Ft(t.rootElement)), t
   }
   _append() {
      if (this._isAppended) return
      const t = this._getElement()
      this._config.rootElement.append(t),
         A.on(t, al, () => {
            $e(this._config.clickCallback)
         }),
         (this._isAppended = !0)
   }
   _emulateAnimation(t) {
      Iu(t, this._getElement(), this._config.isAnimated)
   }
}
const Eb = 'focustrap',
   vb = 'bs.focustrap',
   rr = `.${vb}`,
   bb = `focusin${rr}`,
   yb = `keydown.tab${rr}`,
   wb = 'Tab',
   Tb = 'forward',
   ll = 'backward',
   Ab = { autofocus: !0, trapElement: null },
   Sb = { autofocus: 'boolean', trapElement: 'element' }
class Qu extends bs {
   constructor(t) {
      super(),
         (this._config = this._getConfig(t)),
         (this._isActive = !1),
         (this._lastTabNavDirection = null)
   }
   static get Default() {
      return Ab
   }
   static get DefaultType() {
      return Sb
   }
   static get NAME() {
      return Eb
   }
   activate() {
      this._isActive ||
         (this._config.autofocus && this._config.trapElement.focus(),
         A.off(document, rr),
         A.on(document, bb, (t) => this._handleFocusin(t)),
         A.on(document, yb, (t) => this._handleKeydown(t)),
         (this._isActive = !0))
   }
   deactivate() {
      this._isActive && ((this._isActive = !1), A.off(document, rr))
   }
   _handleFocusin(t) {
      const { trapElement: n } = this._config
      if (t.target === document || t.target === n || n.contains(t.target))
         return
      const s = V.focusableChildren(n)
      s.length === 0
         ? n.focus()
         : this._lastTabNavDirection === ll
         ? s[s.length - 1].focus()
         : s[0].focus()
   }
   _handleKeydown(t) {
      t.key === wb && (this._lastTabNavDirection = t.shiftKey ? ll : Tb)
   }
}
const cl = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
   ul = '.sticky-top',
   ks = 'padding-right',
   fl = 'margin-right'
class Vo {
   constructor() {
      this._element = document.body
   }
   getWidth() {
      const t = document.documentElement.clientWidth
      return Math.abs(window.innerWidth - t)
   }
   hide() {
      const t = this.getWidth()
      this._disableOverFlow(),
         this._setElementAttributes(this._element, ks, (n) => n + t),
         this._setElementAttributes(cl, ks, (n) => n + t),
         this._setElementAttributes(ul, fl, (n) => n - t)
   }
   reset() {
      this._resetElementAttributes(this._element, 'overflow'),
         this._resetElementAttributes(this._element, ks),
         this._resetElementAttributes(cl, ks),
         this._resetElementAttributes(ul, fl)
   }
   isOverflowing() {
      return this.getWidth() > 0
   }
   _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow'),
         (this._element.style.overflow = 'hidden')
   }
   _setElementAttributes(t, n, s) {
      const r = this.getWidth(),
         o = (i) => {
            if (i !== this._element && window.innerWidth > i.clientWidth + r)
               return
            this._saveInitialAttribute(i, n)
            const a = window.getComputedStyle(i).getPropertyValue(n)
            i.style.setProperty(n, `${s(Number.parseFloat(a))}px`)
         }
      this._applyManipulationCallback(t, o)
   }
   _saveInitialAttribute(t, n) {
      const s = t.style.getPropertyValue(n)
      s && Ot.setDataAttribute(t, n, s)
   }
   _resetElementAttributes(t, n) {
      const s = (r) => {
         const o = Ot.getDataAttribute(r, n)
         if (o === null) {
            r.style.removeProperty(n)
            return
         }
         Ot.removeDataAttribute(r, n), r.style.setProperty(n, o)
      }
      this._applyManipulationCallback(t, s)
   }
   _applyManipulationCallback(t, n) {
      if (St(t)) {
         n(t)
         return
      }
      for (const s of V.find(t, this._element)) n(s)
   }
}
const Ob = 'modal',
   Cb = 'bs.modal',
   Je = `.${Cb}`,
   Nb = '.data-api',
   xb = 'Escape',
   Rb = `hide${Je}`,
   Pb = `hidePrevented${Je}`,
   Zu = `hidden${Je}`,
   ef = `show${Je}`,
   kb = `shown${Je}`,
   Db = `resize${Je}`,
   $b = `click.dismiss${Je}`,
   Lb = `mousedown.dismiss${Je}`,
   Ib = `keydown.dismiss${Je}`,
   Mb = `click${Je}${Nb}`,
   dl = 'modal-open',
   Hb = 'fade',
   hl = 'show',
   ro = 'modal-static',
   Fb = '.modal.show',
   Wb = '.modal-dialog',
   Vb = '.modal-body',
   Bb = '[data-bs-toggle="modal"]',
   jb = { backdrop: !0, focus: !0, keyboard: !0 },
   Ub = { backdrop: '(boolean|string)', focus: 'boolean', keyboard: 'boolean' }
class Mn extends at {
   constructor(t, n) {
      super(t, n),
         (this._dialog = V.findOne(Wb, this._element)),
         (this._backdrop = this._initializeBackDrop()),
         (this._focustrap = this._initializeFocusTrap()),
         (this._isShown = !1),
         (this._isTransitioning = !1),
         (this._scrollBar = new Vo()),
         this._addEventListeners()
   }
   static get Default() {
      return jb
   }
   static get DefaultType() {
      return Ub
   }
   static get NAME() {
      return Ob
   }
   toggle(t) {
      return this._isShown ? this.hide() : this.show(t)
   }
   show(t) {
      this._isShown ||
         this._isTransitioning ||
         A.trigger(this._element, ef, { relatedTarget: t }).defaultPrevented ||
         ((this._isShown = !0),
         (this._isTransitioning = !0),
         this._scrollBar.hide(),
         document.body.classList.add(dl),
         this._adjustDialog(),
         this._backdrop.show(() => this._showElement(t)))
   }
   hide() {
      !this._isShown ||
         this._isTransitioning ||
         A.trigger(this._element, Rb).defaultPrevented ||
         ((this._isShown = !1),
         (this._isTransitioning = !0),
         this._focustrap.deactivate(),
         this._element.classList.remove(hl),
         this._queueCallback(
            () => this._hideModal(),
            this._element,
            this._isAnimated()
         ))
   }
   dispose() {
      A.off(window, Je),
         A.off(this._dialog, Je),
         this._backdrop.dispose(),
         this._focustrap.deactivate(),
         super.dispose()
   }
   handleUpdate() {
      this._adjustDialog()
   }
   _initializeBackDrop() {
      return new Xu({
         isVisible: !!this._config.backdrop,
         isAnimated: this._isAnimated(),
      })
   }
   _initializeFocusTrap() {
      return new Qu({ trapElement: this._element })
   }
   _showElement(t) {
      document.body.contains(this._element) ||
         document.body.append(this._element),
         (this._element.style.display = 'block'),
         this._element.removeAttribute('aria-hidden'),
         this._element.setAttribute('aria-modal', !0),
         this._element.setAttribute('role', 'dialog'),
         (this._element.scrollTop = 0)
      const n = V.findOne(Vb, this._dialog)
      n && (n.scrollTop = 0), vs(this._element), this._element.classList.add(hl)
      const s = () => {
         this._config.focus && this._focustrap.activate(),
            (this._isTransitioning = !1),
            A.trigger(this._element, kb, { relatedTarget: t })
      }
      this._queueCallback(s, this._dialog, this._isAnimated())
   }
   _addEventListeners() {
      A.on(this._element, Ib, (t) => {
         if (t.key === xb) {
            if (this._config.keyboard) {
               this.hide()
               return
            }
            this._triggerBackdropTransition()
         }
      }),
         A.on(window, Db, () => {
            this._isShown && !this._isTransitioning && this._adjustDialog()
         }),
         A.on(this._element, Lb, (t) => {
            A.one(this._element, $b, (n) => {
               if (
                  !(this._element !== t.target || this._element !== n.target)
               ) {
                  if (this._config.backdrop === 'static') {
                     this._triggerBackdropTransition()
                     return
                  }
                  this._config.backdrop && this.hide()
               }
            })
         })
   }
   _hideModal() {
      ;(this._element.style.display = 'none'),
         this._element.setAttribute('aria-hidden', !0),
         this._element.removeAttribute('aria-modal'),
         this._element.removeAttribute('role'),
         (this._isTransitioning = !1),
         this._backdrop.hide(() => {
            document.body.classList.remove(dl),
               this._resetAdjustments(),
               this._scrollBar.reset(),
               A.trigger(this._element, Zu)
         })
   }
   _isAnimated() {
      return this._element.classList.contains(Hb)
   }
   _triggerBackdropTransition() {
      if (A.trigger(this._element, Pb).defaultPrevented) return
      const n =
            this._element.scrollHeight > document.documentElement.clientHeight,
         s = this._element.style.overflowY
      s === 'hidden' ||
         this._element.classList.contains(ro) ||
         (n || (this._element.style.overflowY = 'hidden'),
         this._element.classList.add(ro),
         this._queueCallback(() => {
            this._element.classList.remove(ro),
               this._queueCallback(() => {
                  this._element.style.overflowY = s
               }, this._dialog)
         }, this._dialog),
         this._element.focus())
   }
   _adjustDialog() {
      const t =
            this._element.scrollHeight > document.documentElement.clientHeight,
         n = this._scrollBar.getWidth(),
         s = n > 0
      if (s && !t) {
         const r = Ge() ? 'paddingLeft' : 'paddingRight'
         this._element.style[r] = `${n}px`
      }
      if (!s && t) {
         const r = Ge() ? 'paddingRight' : 'paddingLeft'
         this._element.style[r] = `${n}px`
      }
   }
   _resetAdjustments() {
      ;(this._element.style.paddingLeft = ''),
         (this._element.style.paddingRight = '')
   }
   static jQueryInterface(t, n) {
      return this.each(function () {
         const s = Mn.getOrCreateInstance(this, t)
         if (typeof t == 'string') {
            if (typeof s[t] > 'u') throw new TypeError(`No method named "${t}"`)
            s[t](n)
         }
      })
   }
}
A.on(document, Mb, Bb, function (e) {
   const t = V.getElementFromSelector(this)
   ;['A', 'AREA'].includes(this.tagName) && e.preventDefault(),
      A.one(t, ef, (r) => {
         r.defaultPrevented ||
            A.one(t, Zu, () => {
               Un(this) && this.focus()
            })
      })
   const n = V.findOne(Fb)
   n && Mn.getInstance(n).hide(), Mn.getOrCreateInstance(t).toggle(this)
})
kr(Mn)
Xe(Mn)
const Kb = 'offcanvas',
   zb = 'bs.offcanvas',
   xt = `.${zb}`,
   tf = '.data-api',
   qb = `load${xt}${tf}`,
   Yb = 'Escape',
   pl = 'show',
   ml = 'showing',
   _l = 'hiding',
   Gb = 'offcanvas-backdrop',
   nf = '.offcanvas.show',
   Jb = `show${xt}`,
   Xb = `shown${xt}`,
   Qb = `hide${xt}`,
   gl = `hidePrevented${xt}`,
   sf = `hidden${xt}`,
   Zb = `resize${xt}`,
   ey = `click${xt}${tf}`,
   ty = `keydown.dismiss${xt}`,
   ny = '[data-bs-toggle="offcanvas"]',
   sy = { backdrop: !0, keyboard: !0, scroll: !1 },
   ry = { backdrop: '(boolean|string)', keyboard: 'boolean', scroll: 'boolean' }
class Vt extends at {
   constructor(t, n) {
      super(t, n),
         (this._isShown = !1),
         (this._backdrop = this._initializeBackDrop()),
         (this._focustrap = this._initializeFocusTrap()),
         this._addEventListeners()
   }
   static get Default() {
      return sy
   }
   static get DefaultType() {
      return ry
   }
   static get NAME() {
      return Kb
   }
   toggle(t) {
      return this._isShown ? this.hide() : this.show(t)
   }
   show(t) {
      if (
         this._isShown ||
         A.trigger(this._element, Jb, { relatedTarget: t }).defaultPrevented
      )
         return
      ;(this._isShown = !0),
         this._backdrop.show(),
         this._config.scroll || new Vo().hide(),
         this._element.setAttribute('aria-modal', !0),
         this._element.setAttribute('role', 'dialog'),
         this._element.classList.add(ml)
      const s = () => {
         ;(!this._config.scroll || this._config.backdrop) &&
            this._focustrap.activate(),
            this._element.classList.add(pl),
            this._element.classList.remove(ml),
            A.trigger(this._element, Xb, { relatedTarget: t })
      }
      this._queueCallback(s, this._element, !0)
   }
   hide() {
      if (!this._isShown || A.trigger(this._element, Qb).defaultPrevented)
         return
      this._focustrap.deactivate(),
         this._element.blur(),
         (this._isShown = !1),
         this._element.classList.add(_l),
         this._backdrop.hide()
      const n = () => {
         this._element.classList.remove(pl, _l),
            this._element.removeAttribute('aria-modal'),
            this._element.removeAttribute('role'),
            this._config.scroll || new Vo().reset(),
            A.trigger(this._element, sf)
      }
      this._queueCallback(n, this._element, !0)
   }
   dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
   }
   _initializeBackDrop() {
      const t = () => {
            if (this._config.backdrop === 'static') {
               A.trigger(this._element, gl)
               return
            }
            this.hide()
         },
         n = !!this._config.backdrop
      return new Xu({
         className: Gb,
         isVisible: n,
         isAnimated: !0,
         rootElement: this._element.parentNode,
         clickCallback: n ? t : null,
      })
   }
   _initializeFocusTrap() {
      return new Qu({ trapElement: this._element })
   }
   _addEventListeners() {
      A.on(this._element, ty, (t) => {
         if (t.key === Yb) {
            if (this._config.keyboard) {
               this.hide()
               return
            }
            A.trigger(this._element, gl)
         }
      })
   }
   static jQueryInterface(t) {
      return this.each(function () {
         const n = Vt.getOrCreateInstance(this, t)
         if (typeof t == 'string') {
            if (n[t] === void 0 || t.startsWith('_') || t === 'constructor')
               throw new TypeError(`No method named "${t}"`)
            n[t](this)
         }
      })
   }
}
A.on(document, ey, ny, function (e) {
   const t = V.getElementFromSelector(this)
   if ((['A', 'AREA'].includes(this.tagName) && e.preventDefault(), Wt(this)))
      return
   A.one(t, sf, () => {
      Un(this) && this.focus()
   })
   const n = V.findOne(nf)
   n && n !== t && Vt.getInstance(n).hide(),
      Vt.getOrCreateInstance(t).toggle(this)
})
A.on(window, qb, () => {
   for (const e of V.find(nf)) Vt.getOrCreateInstance(e).show()
})
A.on(window, Zb, () => {
   for (const e of V.find('[aria-modal][class*=show][class*=offcanvas-]'))
      getComputedStyle(e).position !== 'fixed' &&
         Vt.getOrCreateInstance(e).hide()
})
kr(Vt)
Xe(Vt)
const oy = /^aria-[\w-]*$/i,
   rf = {
      '*': ['class', 'dir', 'id', 'lang', 'role', oy],
      a: ['target', 'href', 'title', 'rel'],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
   },
   iy = new Set([
      'background',
      'cite',
      'href',
      'itemtype',
      'longdesc',
      'poster',
      'src',
      'xlink:href',
   ]),
   ay = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
   ly = (e, t) => {
      const n = e.nodeName.toLowerCase()
      return t.includes(n)
         ? iy.has(n)
            ? !!ay.test(e.nodeValue)
            : !0
         : t.filter((s) => s instanceof RegExp).some((s) => s.test(n))
   }
function cy(e, t, n) {
   if (!e.length) return e
   if (n && typeof n == 'function') return n(e)
   const r = new window.DOMParser().parseFromString(e, 'text/html'),
      o = [].concat(...r.body.querySelectorAll('*'))
   for (const i of o) {
      const a = i.nodeName.toLowerCase()
      if (!Object.keys(t).includes(a)) {
         i.remove()
         continue
      }
      const l = [].concat(...i.attributes),
         u = [].concat(t['*'] || [], t[a] || [])
      for (const c of l) ly(c, u) || i.removeAttribute(c.nodeName)
   }
   return r.body.innerHTML
}
const uy = 'TemplateFactory',
   fy = {
      allowList: rf,
      content: {},
      extraClass: '',
      html: !1,
      sanitize: !0,
      sanitizeFn: null,
      template: '<div></div>',
   },
   dy = {
      allowList: 'object',
      content: 'object',
      extraClass: '(string|function)',
      html: 'boolean',
      sanitize: 'boolean',
      sanitizeFn: '(null|function)',
      template: 'string',
   },
   hy = {
      entry: '(string|element|function|null)',
      selector: '(string|element)',
   }
class py extends bs {
   constructor(t) {
      super(), (this._config = this._getConfig(t))
   }
   static get Default() {
      return fy
   }
   static get DefaultType() {
      return dy
   }
   static get NAME() {
      return uy
   }
   getContent() {
      return Object.values(this._config.content)
         .map((t) => this._resolvePossibleFunction(t))
         .filter(Boolean)
   }
   hasContent() {
      return this.getContent().length > 0
   }
   changeContent(t) {
      return (
         this._checkContent(t),
         (this._config.content = { ...this._config.content, ...t }),
         this
      )
   }
   toHtml() {
      const t = document.createElement('div')
      t.innerHTML = this._maybeSanitize(this._config.template)
      for (const [r, o] of Object.entries(this._config.content))
         this._setContent(t, o, r)
      const n = t.children[0],
         s = this._resolvePossibleFunction(this._config.extraClass)
      return s && n.classList.add(...s.split(' ')), n
   }
   _typeCheckConfig(t) {
      super._typeCheckConfig(t), this._checkContent(t.content)
   }
   _checkContent(t) {
      for (const [n, s] of Object.entries(t))
         super._typeCheckConfig({ selector: n, entry: s }, hy)
   }
   _setContent(t, n, s) {
      const r = V.findOne(s, t)
      if (r) {
         if (((n = this._resolvePossibleFunction(n)), !n)) {
            r.remove()
            return
         }
         if (St(n)) {
            this._putElementInTemplate(Ft(n), r)
            return
         }
         if (this._config.html) {
            r.innerHTML = this._maybeSanitize(n)
            return
         }
         r.textContent = n
      }
   }
   _maybeSanitize(t) {
      return this._config.sanitize
         ? cy(t, this._config.allowList, this._config.sanitizeFn)
         : t
   }
   _resolvePossibleFunction(t) {
      return $e(t, [this])
   }
   _putElementInTemplate(t, n) {
      if (this._config.html) {
         ;(n.innerHTML = ''), n.append(t)
         return
      }
      n.textContent = t.textContent
   }
}
const my = 'tooltip',
   _y = new Set(['sanitize', 'allowList', 'sanitizeFn']),
   oo = 'fade',
   gy = 'modal',
   Ds = 'show',
   Ey = '.tooltip-inner',
   El = `.${gy}`,
   vl = 'hide.bs.modal',
   Qn = 'hover',
   io = 'focus',
   vy = 'click',
   by = 'manual',
   yy = 'hide',
   wy = 'hidden',
   Ty = 'show',
   Ay = 'shown',
   Sy = 'inserted',
   Oy = 'click',
   Cy = 'focusin',
   Ny = 'focusout',
   xy = 'mouseenter',
   Ry = 'mouseleave',
   Py = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: Ge() ? 'left' : 'right',
      BOTTOM: 'bottom',
      LEFT: Ge() ? 'right' : 'left',
   },
   ky = {
      allowList: rf,
      animation: !0,
      boundary: 'clippingParents',
      container: !1,
      customClass: '',
      delay: 0,
      fallbackPlacements: ['top', 'right', 'bottom', 'left'],
      html: !1,
      offset: [0, 6],
      placement: 'top',
      popperConfig: null,
      sanitize: !0,
      sanitizeFn: null,
      selector: !1,
      template:
         '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: '',
      trigger: 'hover focus',
   },
   Dy = {
      allowList: 'object',
      animation: 'boolean',
      boundary: '(string|element)',
      container: '(string|element|boolean)',
      customClass: '(string|function)',
      delay: '(number|object)',
      fallbackPlacements: 'array',
      html: 'boolean',
      offset: '(array|string|function)',
      placement: '(string|function)',
      popperConfig: '(null|object|function)',
      sanitize: 'boolean',
      sanitizeFn: '(null|function)',
      selector: '(string|boolean)',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
   }
class zn extends at {
   constructor(t, n) {
      if (typeof Pu > 'u')
         throw new TypeError(
            "Bootstrap's tooltips require Popper (https://popper.js.org)"
         )
      super(t, n),
         (this._isEnabled = !0),
         (this._timeout = 0),
         (this._isHovered = null),
         (this._activeTrigger = {}),
         (this._popper = null),
         (this._templateFactory = null),
         (this._newContent = null),
         (this.tip = null),
         this._setListeners(),
         this._config.selector || this._fixTitle()
   }
   static get Default() {
      return ky
   }
   static get DefaultType() {
      return Dy
   }
   static get NAME() {
      return my
   }
   enable() {
      this._isEnabled = !0
   }
   disable() {
      this._isEnabled = !1
   }
   toggleEnabled() {
      this._isEnabled = !this._isEnabled
   }
   toggle() {
      if (this._isEnabled) {
         if (
            ((this._activeTrigger.click = !this._activeTrigger.click),
            this._isShown())
         ) {
            this._leave()
            return
         }
         this._enter()
      }
   }
   dispose() {
      clearTimeout(this._timeout),
         A.off(this._element.closest(El), vl, this._hideModalHandler),
         this._element.getAttribute('data-bs-original-title') &&
            this._element.setAttribute(
               'title',
               this._element.getAttribute('data-bs-original-title')
            ),
         this._disposePopper(),
         super.dispose()
   }
   show() {
      if (this._element.style.display === 'none')
         throw new Error('Please use show on visible elements')
      if (!(this._isWithContent() && this._isEnabled)) return
      const t = A.trigger(this._element, this.constructor.eventName(Ty)),
         s = (
            $u(this._element) || this._element.ownerDocument.documentElement
         ).contains(this._element)
      if (t.defaultPrevented || !s) return
      this._disposePopper()
      const r = this._getTipElement()
      this._element.setAttribute('aria-describedby', r.getAttribute('id'))
      const { container: o } = this._config
      if (
         (this._element.ownerDocument.documentElement.contains(this.tip) ||
            (o.append(r),
            A.trigger(this._element, this.constructor.eventName(Sy))),
         (this._popper = this._createPopper(r)),
         r.classList.add(Ds),
         'ontouchstart' in document.documentElement)
      )
         for (const a of [].concat(...document.body.children))
            A.on(a, 'mouseover', nr)
      const i = () => {
         A.trigger(this._element, this.constructor.eventName(Ay)),
            this._isHovered === !1 && this._leave(),
            (this._isHovered = !1)
      }
      this._queueCallback(i, this.tip, this._isAnimated())
   }
   hide() {
      if (
         !this._isShown() ||
         A.trigger(this._element, this.constructor.eventName(yy))
            .defaultPrevented
      )
         return
      if (
         (this._getTipElement().classList.remove(Ds),
         'ontouchstart' in document.documentElement)
      )
         for (const r of [].concat(...document.body.children))
            A.off(r, 'mouseover', nr)
      ;(this._activeTrigger[vy] = !1),
         (this._activeTrigger[io] = !1),
         (this._activeTrigger[Qn] = !1),
         (this._isHovered = null)
      const s = () => {
         this._isWithActiveTrigger() ||
            (this._isHovered || this._disposePopper(),
            this._element.removeAttribute('aria-describedby'),
            A.trigger(this._element, this.constructor.eventName(wy)))
      }
      this._queueCallback(s, this.tip, this._isAnimated())
   }
   update() {
      this._popper && this._popper.update()
   }
   _isWithContent() {
      return !!this._getTitle()
   }
   _getTipElement() {
      return (
         this.tip ||
            (this.tip = this._createTipElement(
               this._newContent || this._getContentForTemplate()
            )),
         this.tip
      )
   }
   _createTipElement(t) {
      const n = this._getTemplateFactory(t).toHtml()
      if (!n) return null
      n.classList.remove(oo, Ds),
         n.classList.add(`bs-${this.constructor.NAME}-auto`)
      const s = vE(this.constructor.NAME).toString()
      return (
         n.setAttribute('id', s), this._isAnimated() && n.classList.add(oo), n
      )
   }
   setContent(t) {
      ;(this._newContent = t),
         this._isShown() && (this._disposePopper(), this.show())
   }
   _getTemplateFactory(t) {
      return (
         this._templateFactory
            ? this._templateFactory.changeContent(t)
            : (this._templateFactory = new py({
                 ...this._config,
                 content: t,
                 extraClass: this._resolvePossibleFunction(
                    this._config.customClass
                 ),
              })),
         this._templateFactory
      )
   }
   _getContentForTemplate() {
      return { [Ey]: this._getTitle() }
   }
   _getTitle() {
      return (
         this._resolvePossibleFunction(this._config.title) ||
         this._element.getAttribute('data-bs-original-title')
      )
   }
   _initializeOnDelegatedTarget(t) {
      return this.constructor.getOrCreateInstance(
         t.delegateTarget,
         this._getDelegateConfig()
      )
   }
   _isAnimated() {
      return (
         this._config.animation || (this.tip && this.tip.classList.contains(oo))
      )
   }
   _isShown() {
      return this.tip && this.tip.classList.contains(Ds)
   }
   _createPopper(t) {
      const n = $e(this._config.placement, [this, t, this._element]),
         s = Py[n.toUpperCase()]
      return Ni(this._element, t, this._getPopperConfig(s))
   }
   _getOffset() {
      const { offset: t } = this._config
      return typeof t == 'string'
         ? t.split(',').map((n) => Number.parseInt(n, 10))
         : typeof t == 'function'
         ? (n) => t(n, this._element)
         : t
   }
   _resolvePossibleFunction(t) {
      return $e(t, [this._element])
   }
   _getPopperConfig(t) {
      const n = {
         placement: t,
         modifiers: [
            {
               name: 'flip',
               options: { fallbackPlacements: this._config.fallbackPlacements },
            },
            { name: 'offset', options: { offset: this._getOffset() } },
            {
               name: 'preventOverflow',
               options: { boundary: this._config.boundary },
            },
            {
               name: 'arrow',
               options: { element: `.${this.constructor.NAME}-arrow` },
            },
            {
               name: 'preSetPlacement',
               enabled: !0,
               phase: 'beforeMain',
               fn: (s) => {
                  this._getTipElement().setAttribute(
                     'data-popper-placement',
                     s.state.placement
                  )
               },
            },
         ],
      }
      return { ...n, ...$e(this._config.popperConfig, [n]) }
   }
   _setListeners() {
      const t = this._config.trigger.split(' ')
      for (const n of t)
         if (n === 'click')
            A.on(
               this._element,
               this.constructor.eventName(Oy),
               this._config.selector,
               (s) => {
                  this._initializeOnDelegatedTarget(s).toggle()
               }
            )
         else if (n !== by) {
            const s =
                  n === Qn
                     ? this.constructor.eventName(xy)
                     : this.constructor.eventName(Cy),
               r =
                  n === Qn
                     ? this.constructor.eventName(Ry)
                     : this.constructor.eventName(Ny)
            A.on(this._element, s, this._config.selector, (o) => {
               const i = this._initializeOnDelegatedTarget(o)
               ;(i._activeTrigger[o.type === 'focusin' ? io : Qn] = !0),
                  i._enter()
            }),
               A.on(this._element, r, this._config.selector, (o) => {
                  const i = this._initializeOnDelegatedTarget(o)
                  ;(i._activeTrigger[o.type === 'focusout' ? io : Qn] =
                     i._element.contains(o.relatedTarget)),
                     i._leave()
               })
         }
      ;(this._hideModalHandler = () => {
         this._element && this.hide()
      }),
         A.on(this._element.closest(El), vl, this._hideModalHandler)
   }
   _fixTitle() {
      const t = this._element.getAttribute('title')
      t &&
         (!this._element.getAttribute('aria-label') &&
            !this._element.textContent.trim() &&
            this._element.setAttribute('aria-label', t),
         this._element.setAttribute('data-bs-original-title', t),
         this._element.removeAttribute('title'))
   }
   _enter() {
      if (this._isShown() || this._isHovered) {
         this._isHovered = !0
         return
      }
      ;(this._isHovered = !0),
         this._setTimeout(() => {
            this._isHovered && this.show()
         }, this._config.delay.show)
   }
   _leave() {
      this._isWithActiveTrigger() ||
         ((this._isHovered = !1),
         this._setTimeout(() => {
            this._isHovered || this.hide()
         }, this._config.delay.hide))
   }
   _setTimeout(t, n) {
      clearTimeout(this._timeout), (this._timeout = setTimeout(t, n))
   }
   _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(!0)
   }
   _getConfig(t) {
      const n = Ot.getDataAttributes(this._element)
      for (const s of Object.keys(n)) _y.has(s) && delete n[s]
      return (
         (t = { ...n, ...(typeof t == 'object' && t ? t : {}) }),
         (t = this._mergeConfigObj(t)),
         (t = this._configAfterMerge(t)),
         this._typeCheckConfig(t),
         t
      )
   }
   _configAfterMerge(t) {
      return (
         (t.container = t.container === !1 ? document.body : Ft(t.container)),
         typeof t.delay == 'number' &&
            (t.delay = { show: t.delay, hide: t.delay }),
         typeof t.title == 'number' && (t.title = t.title.toString()),
         typeof t.content == 'number' && (t.content = t.content.toString()),
         t
      )
   }
   _getDelegateConfig() {
      const t = {}
      for (const [n, s] of Object.entries(this._config))
         this.constructor.Default[n] !== s && (t[n] = s)
      return (t.selector = !1), (t.trigger = 'manual'), t
   }
   _disposePopper() {
      this._popper && (this._popper.destroy(), (this._popper = null)),
         this.tip && (this.tip.remove(), (this.tip = null))
   }
   static jQueryInterface(t) {
      return this.each(function () {
         const n = zn.getOrCreateInstance(this, t)
         if (typeof t == 'string') {
            if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`)
            n[t]()
         }
      })
   }
}
Xe(zn)
const $y = 'popover',
   Ly = '.popover-header',
   Iy = '.popover-body',
   My = {
      ...zn.Default,
      content: '',
      offset: [0, 8],
      placement: 'right',
      template:
         '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      trigger: 'click',
   },
   Hy = { ...zn.DefaultType, content: '(null|string|element|function)' }
class ki extends zn {
   static get Default() {
      return My
   }
   static get DefaultType() {
      return Hy
   }
   static get NAME() {
      return $y
   }
   _isWithContent() {
      return this._getTitle() || this._getContent()
   }
   _getContentForTemplate() {
      return { [Ly]: this._getTitle(), [Iy]: this._getContent() }
   }
   _getContent() {
      return this._resolvePossibleFunction(this._config.content)
   }
   static jQueryInterface(t) {
      return this.each(function () {
         const n = ki.getOrCreateInstance(this, t)
         if (typeof t == 'string') {
            if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`)
            n[t]()
         }
      })
   }
}
Xe(ki)
const Fy = 'scrollspy',
   Wy = 'bs.scrollspy',
   Di = `.${Wy}`,
   Vy = '.data-api',
   By = `activate${Di}`,
   bl = `click${Di}`,
   jy = `load${Di}${Vy}`,
   Uy = 'dropdown-item',
   pn = 'active',
   Ky = '[data-bs-spy="scroll"]',
   ao = '[href]',
   zy = '.nav, .list-group',
   yl = '.nav-link',
   qy = '.nav-item',
   Yy = '.list-group-item',
   Gy = `${yl}, ${qy} > ${yl}, ${Yy}`,
   Jy = '.dropdown',
   Xy = '.dropdown-toggle',
   Qy = {
      offset: null,
      rootMargin: '0px 0px -25%',
      smoothScroll: !1,
      target: null,
      threshold: [0.1, 0.5, 1],
   },
   Zy = {
      offset: '(number|null)',
      rootMargin: 'string',
      smoothScroll: 'boolean',
      target: 'element',
      threshold: 'array',
   }
class Lr extends at {
   constructor(t, n) {
      super(t, n),
         (this._targetLinks = new Map()),
         (this._observableSections = new Map()),
         (this._rootElement =
            getComputedStyle(this._element).overflowY === 'visible'
               ? null
               : this._element),
         (this._activeTarget = null),
         (this._observer = null),
         (this._previousScrollData = {
            visibleEntryTop: 0,
            parentScrollTop: 0,
         }),
         this.refresh()
   }
   static get Default() {
      return Qy
   }
   static get DefaultType() {
      return Zy
   }
   static get NAME() {
      return Fy
   }
   refresh() {
      this._initializeTargetsAndObservables(),
         this._maybeEnableSmoothScroll(),
         this._observer
            ? this._observer.disconnect()
            : (this._observer = this._getNewObserver())
      for (const t of this._observableSections.values())
         this._observer.observe(t)
   }
   dispose() {
      this._observer.disconnect(), super.dispose()
   }
   _configAfterMerge(t) {
      return (
         (t.target = Ft(t.target) || document.body),
         (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
         typeof t.threshold == 'string' &&
            (t.threshold = t.threshold
               .split(',')
               .map((n) => Number.parseFloat(n))),
         t
      )
   }
   _maybeEnableSmoothScroll() {
      this._config.smoothScroll &&
         (A.off(this._config.target, bl),
         A.on(this._config.target, bl, ao, (t) => {
            const n = this._observableSections.get(t.target.hash)
            if (n) {
               t.preventDefault()
               const s = this._rootElement || window,
                  r = n.offsetTop - this._element.offsetTop
               if (s.scrollTo) {
                  s.scrollTo({ top: r, behavior: 'smooth' })
                  return
               }
               s.scrollTop = r
            }
         }))
   }
   _getNewObserver() {
      const t = {
         root: this._rootElement,
         threshold: this._config.threshold,
         rootMargin: this._config.rootMargin,
      }
      return new IntersectionObserver((n) => this._observerCallback(n), t)
   }
   _observerCallback(t) {
      const n = (i) => this._targetLinks.get(`#${i.target.id}`),
         s = (i) => {
            ;(this._previousScrollData.visibleEntryTop = i.target.offsetTop),
               this._process(n(i))
         },
         r = (this._rootElement || document.documentElement).scrollTop,
         o = r >= this._previousScrollData.parentScrollTop
      this._previousScrollData.parentScrollTop = r
      for (const i of t) {
         if (!i.isIntersecting) {
            ;(this._activeTarget = null), this._clearActiveClass(n(i))
            continue
         }
         const a =
            i.target.offsetTop >= this._previousScrollData.visibleEntryTop
         if (o && a) {
            if ((s(i), !r)) return
            continue
         }
         !o && !a && s(i)
      }
   }
   _initializeTargetsAndObservables() {
      ;(this._targetLinks = new Map()), (this._observableSections = new Map())
      const t = V.find(ao, this._config.target)
      for (const n of t) {
         if (!n.hash || Wt(n)) continue
         const s = V.findOne(decodeURI(n.hash), this._element)
         Un(s) &&
            (this._targetLinks.set(decodeURI(n.hash), n),
            this._observableSections.set(n.hash, s))
      }
   }
   _process(t) {
      this._activeTarget !== t &&
         (this._clearActiveClass(this._config.target),
         (this._activeTarget = t),
         t.classList.add(pn),
         this._activateParents(t),
         A.trigger(this._element, By, { relatedTarget: t }))
   }
   _activateParents(t) {
      if (t.classList.contains(Uy)) {
         V.findOne(Xy, t.closest(Jy)).classList.add(pn)
         return
      }
      for (const n of V.parents(t, zy))
         for (const s of V.prev(n, Gy)) s.classList.add(pn)
   }
   _clearActiveClass(t) {
      t.classList.remove(pn)
      const n = V.find(`${ao}.${pn}`, t)
      for (const s of n) s.classList.remove(pn)
   }
   static jQueryInterface(t) {
      return this.each(function () {
         const n = Lr.getOrCreateInstance(this, t)
         if (typeof t == 'string') {
            if (n[t] === void 0 || t.startsWith('_') || t === 'constructor')
               throw new TypeError(`No method named "${t}"`)
            n[t]()
         }
      })
   }
}
A.on(window, jy, () => {
   for (const e of V.find(Ky)) Lr.getOrCreateInstance(e)
})
Xe(Lr)
const ew = 'tab',
   tw = 'bs.tab',
   un = `.${tw}`,
   nw = `hide${un}`,
   sw = `hidden${un}`,
   rw = `show${un}`,
   ow = `shown${un}`,
   iw = `click${un}`,
   aw = `keydown${un}`,
   lw = `load${un}`,
   cw = 'ArrowLeft',
   wl = 'ArrowRight',
   uw = 'ArrowUp',
   Tl = 'ArrowDown',
   lo = 'Home',
   Al = 'End',
   Zt = 'active',
   Sl = 'fade',
   co = 'show',
   fw = 'dropdown',
   of = '.dropdown-toggle',
   dw = '.dropdown-menu',
   uo = `:not(${of})`,
   hw = '.list-group, .nav, [role="tablist"]',
   pw = '.nav-item, .list-group-item',
   mw = `.nav-link${uo}, .list-group-item${uo}, [role="tab"]${uo}`,
   af =
      '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
   fo = `${mw}, ${af}`,
   _w = `.${Zt}[data-bs-toggle="tab"], .${Zt}[data-bs-toggle="pill"], .${Zt}[data-bs-toggle="list"]`
class Hn extends at {
   constructor(t) {
      super(t),
         (this._parent = this._element.closest(hw)),
         this._parent &&
            (this._setInitialAttributes(this._parent, this._getChildren()),
            A.on(this._element, aw, (n) => this._keydown(n)))
   }
   static get NAME() {
      return ew
   }
   show() {
      const t = this._element
      if (this._elemIsActive(t)) return
      const n = this._getActiveElem(),
         s = n ? A.trigger(n, nw, { relatedTarget: t }) : null
      A.trigger(t, rw, { relatedTarget: n }).defaultPrevented ||
         (s && s.defaultPrevented) ||
         (this._deactivate(n, t), this._activate(t, n))
   }
   _activate(t, n) {
      if (!t) return
      t.classList.add(Zt), this._activate(V.getElementFromSelector(t))
      const s = () => {
         if (t.getAttribute('role') !== 'tab') {
            t.classList.add(co)
            return
         }
         t.removeAttribute('tabindex'),
            t.setAttribute('aria-selected', !0),
            this._toggleDropDown(t, !0),
            A.trigger(t, ow, { relatedTarget: n })
      }
      this._queueCallback(s, t, t.classList.contains(Sl))
   }
   _deactivate(t, n) {
      if (!t) return
      t.classList.remove(Zt),
         t.blur(),
         this._deactivate(V.getElementFromSelector(t))
      const s = () => {
         if (t.getAttribute('role') !== 'tab') {
            t.classList.remove(co)
            return
         }
         t.setAttribute('aria-selected', !1),
            t.setAttribute('tabindex', '-1'),
            this._toggleDropDown(t, !1),
            A.trigger(t, sw, { relatedTarget: n })
      }
      this._queueCallback(s, t, t.classList.contains(Sl))
   }
   _keydown(t) {
      if (![cw, wl, uw, Tl, lo, Al].includes(t.key)) return
      t.stopPropagation(), t.preventDefault()
      const n = this._getChildren().filter((r) => !Wt(r))
      let s
      if ([lo, Al].includes(t.key)) s = n[t.key === lo ? 0 : n.length - 1]
      else {
         const r = [wl, Tl].includes(t.key)
         s = xi(n, t.target, r, !0)
      }
      s && (s.focus({ preventScroll: !0 }), Hn.getOrCreateInstance(s).show())
   }
   _getChildren() {
      return V.find(fo, this._parent)
   }
   _getActiveElem() {
      return this._getChildren().find((t) => this._elemIsActive(t)) || null
   }
   _setInitialAttributes(t, n) {
      this._setAttributeIfNotExists(t, 'role', 'tablist')
      for (const s of n) this._setInitialAttributesOnChild(s)
   }
   _setInitialAttributesOnChild(t) {
      t = this._getInnerElement(t)
      const n = this._elemIsActive(t),
         s = this._getOuterElement(t)
      t.setAttribute('aria-selected', n),
         s !== t && this._setAttributeIfNotExists(s, 'role', 'presentation'),
         n || t.setAttribute('tabindex', '-1'),
         this._setAttributeIfNotExists(t, 'role', 'tab'),
         this._setInitialAttributesOnTargetPanel(t)
   }
   _setInitialAttributesOnTargetPanel(t) {
      const n = V.getElementFromSelector(t)
      n &&
         (this._setAttributeIfNotExists(n, 'role', 'tabpanel'),
         t.id && this._setAttributeIfNotExists(n, 'aria-labelledby', `${t.id}`))
   }
   _toggleDropDown(t, n) {
      const s = this._getOuterElement(t)
      if (!s.classList.contains(fw)) return
      const r = (o, i) => {
         const a = V.findOne(o, s)
         a && a.classList.toggle(i, n)
      }
      r(of, Zt), r(dw, co), s.setAttribute('aria-expanded', n)
   }
   _setAttributeIfNotExists(t, n, s) {
      t.hasAttribute(n) || t.setAttribute(n, s)
   }
   _elemIsActive(t) {
      return t.classList.contains(Zt)
   }
   _getInnerElement(t) {
      return t.matches(fo) ? t : V.findOne(fo, t)
   }
   _getOuterElement(t) {
      return t.closest(pw) || t
   }
   static jQueryInterface(t) {
      return this.each(function () {
         const n = Hn.getOrCreateInstance(this)
         if (typeof t == 'string') {
            if (n[t] === void 0 || t.startsWith('_') || t === 'constructor')
               throw new TypeError(`No method named "${t}"`)
            n[t]()
         }
      })
   }
}
A.on(document, iw, af, function (e) {
   ;['A', 'AREA'].includes(this.tagName) && e.preventDefault(),
      !Wt(this) && Hn.getOrCreateInstance(this).show()
})
A.on(window, lw, () => {
   for (const e of V.find(_w)) Hn.getOrCreateInstance(e)
})
Xe(Hn)
const gw = 'toast',
   Ew = 'bs.toast',
   Ut = `.${Ew}`,
   vw = `mouseover${Ut}`,
   bw = `mouseout${Ut}`,
   yw = `focusin${Ut}`,
   ww = `focusout${Ut}`,
   Tw = `hide${Ut}`,
   Aw = `hidden${Ut}`,
   Sw = `show${Ut}`,
   Ow = `shown${Ut}`,
   Cw = 'fade',
   Ol = 'hide',
   $s = 'show',
   Ls = 'showing',
   Nw = { animation: 'boolean', autohide: 'boolean', delay: 'number' },
   xw = { animation: !0, autohide: !0, delay: 5e3 }
class Ir extends at {
   constructor(t, n) {
      super(t, n),
         (this._timeout = null),
         (this._hasMouseInteraction = !1),
         (this._hasKeyboardInteraction = !1),
         this._setListeners()
   }
   static get Default() {
      return xw
   }
   static get DefaultType() {
      return Nw
   }
   static get NAME() {
      return gw
   }
   show() {
      if (A.trigger(this._element, Sw).defaultPrevented) return
      this._clearTimeout(),
         this._config.animation && this._element.classList.add(Cw)
      const n = () => {
         this._element.classList.remove(Ls),
            A.trigger(this._element, Ow),
            this._maybeScheduleHide()
      }
      this._element.classList.remove(Ol),
         vs(this._element),
         this._element.classList.add($s, Ls),
         this._queueCallback(n, this._element, this._config.animation)
   }
   hide() {
      if (!this.isShown() || A.trigger(this._element, Tw).defaultPrevented)
         return
      const n = () => {
         this._element.classList.add(Ol),
            this._element.classList.remove(Ls, $s),
            A.trigger(this._element, Aw)
      }
      this._element.classList.add(Ls),
         this._queueCallback(n, this._element, this._config.animation)
   }
   dispose() {
      this._clearTimeout(),
         this.isShown() && this._element.classList.remove($s),
         super.dispose()
   }
   isShown() {
      return this._element.classList.contains($s)
   }
   _maybeScheduleHide() {
      this._config.autohide &&
         (this._hasMouseInteraction ||
            this._hasKeyboardInteraction ||
            (this._timeout = setTimeout(() => {
               this.hide()
            }, this._config.delay)))
   }
   _onInteraction(t, n) {
      switch (t.type) {
         case 'mouseover':
         case 'mouseout': {
            this._hasMouseInteraction = n
            break
         }
         case 'focusin':
         case 'focusout': {
            this._hasKeyboardInteraction = n
            break
         }
      }
      if (n) {
         this._clearTimeout()
         return
      }
      const s = t.relatedTarget
      this._element === s ||
         this._element.contains(s) ||
         this._maybeScheduleHide()
   }
   _setListeners() {
      A.on(this._element, vw, (t) => this._onInteraction(t, !0)),
         A.on(this._element, bw, (t) => this._onInteraction(t, !1)),
         A.on(this._element, yw, (t) => this._onInteraction(t, !0)),
         A.on(this._element, ww, (t) => this._onInteraction(t, !1))
   }
   _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null)
   }
   static jQueryInterface(t) {
      return this.each(function () {
         const n = Ir.getOrCreateInstance(this, t)
         if (typeof t == 'string') {
            if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`)
            n[t](this)
         }
      })
   }
}
kr(Ir)
Xe(Ir)
Sh(lp).use(xg).mount('#app')
