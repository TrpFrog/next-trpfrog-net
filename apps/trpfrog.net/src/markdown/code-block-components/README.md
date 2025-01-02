# Custom Components

つまみネットでは、コードブロックを拡張することにより、カスタムコンポーネントを使用できるようにしています。

## 使い方

こんな感じで書くと

````markdown
```my-component
なんか書く
```
````

`components.ts` で定義されている、`my-component` に対応するコンポーネントが呼ばれます。


## 新しくコンポーネントを作る

`definitions/<component-name>.ts` にコンポーネントの定義と実装を追加します。

```tsx
export const myComponentCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, context, Render }) => {
    const [md, mdInline] = markdown.split('\n\n')
    return (
      <div>
        {context.blog && <p>現在のページ番号: {context.blog.pagePos1Indexed}</p>}
        <div>
          <Render markdown={md} />
        </div>
        <div>
          <Render markdown={md} mode="inline" />
        </div>
      </div>
    )
  },
  DevComponent: undefined, // 開発時に表示するコンポーネント、基本は使わない
}
```

props として `markdown`, `context`, `Render` が渡されます。これはそれぞれ

- `markdown`: コンポーネントの中身の Markdown 文字列
- `context`: コンポーネントが使われているコンテキスト
- `Render`: 生の Markdown 文字列を再度 Markdown Renderer に流すためのコンポーネント (再帰的にレンダリング)

を表します。

コンポーネントが作れたら `components.ts` に定義を登録します。

```tsx
import { myComponentCCBC } from './definitions/myComponent'

export const components = {
  // ...
  'my-component': myComponentCCBC,
}
```

これで完了です。

### Tips

- `definitions/<component-name>.ts` は、あくまで Markdown 文字列をパースして、コンポーネントに詰めるだけの薄いラッパーにします。
  - 凝ったコンポーネントを作るときは、ここではなく `@/components` に実装した上で、薄いラッパーから呼び出すようにするべきです。
  - これはコンポーネントの再利用性を高めるためです。ブログ以外からも呼ばれる可能性のあるコンポーネントは極力そのようにするべきです。

