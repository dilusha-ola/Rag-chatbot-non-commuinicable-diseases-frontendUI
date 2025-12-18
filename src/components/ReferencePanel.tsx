import type { Reference } from '../types/chat';
import { FIXED_REFERENCES } from '../constants/references';

interface ReferencePanelProps {
  references: Reference[];
  showFixedReferences?: boolean;
}

export default function ReferencePanel({ references, showFixedReferences = true }: ReferencePanelProps) {
  // Show fixed references always, and append dynamic references from API
  const displayReferences = showFixedReferences ? FIXED_REFERENCES : references;

  return (
    <div className="w-1/5 flex flex-col pl-12 overflow-y-auto">
      <div className="text-2xl font-bold mx-8 my-4 mb-8">References</div>
      
      <div className="flex flex-col space-y-4 px-8 pb-8">
        {displayReferences.map((ref) => (
          <div key={ref.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-sm mb-2 text-gray-800">{ref.title}</h3>
            <p className="text-xs text-gray-600 mb-2">{ref.source}</p>
            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 hover:underline text-xs font-medium"
              >
                Visit Website →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
