import { Reference } from '../types/chat';

interface ReferencePanelProps {
  references: Reference[];
}

export default function ReferencePanel({ references }: ReferencePanelProps) {
  return (
    <div className="w-1/5 flex flex-col pl-12">
      <div className="text-2xl font-bold mx-8 my-4 mb-8">References</div>
      
      {references.length === 0 ? (
        <p className="text-gray-500 px-8 text-sm">No references yet</p>
      ) : (
        <div className="flex flex-col space-y-4 px-8">
          {references.map((ref) => (
            <div key={ref.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-sm mb-2">{ref.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{ref.source}</p>
              {ref.url && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-xs"
                >
                  View Source →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
