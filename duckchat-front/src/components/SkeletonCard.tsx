import { Skeleton } from "./ui/skeleton";

export interface SkeletonCardProps {
  length?: number;
}

// Todo:  Mudar nome desse componente. Pois ele é um skeleton desse tipo de "componente/estrutura"
function SkeletonCard({ length = 9 }: SkeletonCardProps) {
  return (
    <>
      {Array(length)
        .fill(1)
        .map((_, index) => (
          <div className="flex items-center gap-3 p-2" key={index}>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
    </>
  );
}

export default SkeletonCard;
