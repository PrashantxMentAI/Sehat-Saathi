import { Syringe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const schedule = [
  { vaccine: "BCG", age: "At Birth", protects: "Tuberculosis" },
  { vaccine: "Hepatitis B", age: "At Birth", protects: "Hepatitis B" },
  { vaccine: "Polio (OPV)", age: "At Birth, 6, 10, 14 weeks", protects: "Poliomyelitis" },
  { vaccine: "Pentavalent", age: "6, 10, 14 weeks", protects: "Diphtheria, Tetanus, Pertussis, Hib, Hep B" },
  { vaccine: "Measles, Mumps, Rubella (MMR)", age: "9-12 months", protects: "Measles, Mumps, Rubella" },
  { vaccine: "Tetanus and Diphtheria (Td)", age: "10 & 16 years, then every 10 years", protects: "Tetanus, Diphtheria" },
];

export function VaccinationSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Syringe className="text-primary" />
          Vaccination Schedules
        </CardTitle>
        <CardDescription>
          A general vaccination schedule for children and adults. Schedules may vary by region.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vaccine</TableHead>
              <TableHead>Recommended Age</TableHead>
              <TableHead>Protects Against</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((item) => (
              <TableRow key={item.vaccine}>
                <TableCell className="font-medium">{item.vaccine}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.protects}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
