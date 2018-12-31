export default function CodeBlock(props) {
    const {language, filename, content} = props;
    return (
        <div>
            <a
                href={`data:"text/json";charset=utf-8,${JSON.stringify(content)}`}
                download={filename}>
                Download
            </a>
            <pre className={`language-${language}`}>
                <code className={`language-${language}`}>{JSON.stringify(content, null, 2)}</code>
            </pre>
        </div>
    );
}
