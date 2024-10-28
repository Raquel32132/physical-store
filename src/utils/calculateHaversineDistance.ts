export function calculateHaversineDistance(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number {
  const earthRadiusKM = 6371;
  const latitudeDifference = (latitude2 - latitude1) * (Math.PI / 180);
  const longitudeDifference = (longitude2 - longitude1) * (Math.PI / 180);

  const latitude1InRadians = latitude1 * (Math.PI / 180);
  const latitude2InRadians = latitude2 * (Math.PI / 180);

  const haversineFormulaComponent = 
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos(latitude1InRadians) * Math.cos(latitude2InRadians) *
    Math.sin(longitudeDifference / 2) * Math.sin(longitudeDifference / 2);
  
  const angularDistance = 2 * Math.atan2(Math.sqrt(haversineFormulaComponent), Math.sqrt(1 - haversineFormulaComponent));

  const distanceInKM = earthRadiusKM * angularDistance;

  return distanceInKM;
}