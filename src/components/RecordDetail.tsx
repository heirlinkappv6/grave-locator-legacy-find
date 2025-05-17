
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams, Link } from 'react-router-dom';

// Mock data for record details
const mockRecord = {
  id: 1,
  name: "James Robert Smith",
  age: 78,
  dob: "March 15, 1945",
  birthplace: "Portland, Oregon",
  dod: "January 7, 2023",
  deathplace: "Portland, Oregon",
  lastResidence: "Portland, Oregon",
  obituary: "James Robert Smith, age 78, passed away peacefully on January 7, 2023, surrounded by his loving family. Born on March 15, 1945, in Portland, Oregon, James was a devoted husband, father, grandfather, and friend to many.\n\nJames graduated from Lincoln High School in 1963 and went on to earn his Bachelor's degree in Engineering from Oregon State University. He had a successful 40-year career at Pacific Engineering Services, where he was respected for his expertise and mentorship.\n\nJames was an active member of the community, volunteering with Habitat for Humanity and serving on the board of the Portland Community Foundation. He enjoyed hiking, woodworking, and spending time with his grandchildren.\n\nHe is survived by his wife of 54 years, Mary Smith; children Robert Smith (Sarah) and Sarah Johnson (Michael); and four grandchildren: Emma, Jack, Olivia, and Noah. He was preceded in death by his parents, Robert and Elizabeth Smith.",
  funeral: {
    service: "Memorial service was held on January 14, 2023",
    location: "Grace Community Church, Portland, Oregon",
    arrangements: "Westside Funeral Home"
  },
  relatives: [
    { name: "Mary Smith", relationship: "Spouse", age: 76, location: "Portland, Oregon" },
    { name: "Robert Smith", relationship: "Son", age: 48, location: "Seattle, Washington" },
    { name: "Sarah Johnson", relationship: "Daughter", age: 46, location: "Portland, Oregon" },
    { name: "Michael Johnson", relationship: "Son-in-law", age: 47, location: "Portland, Oregon" },
    { name: "Emma Smith", relationship: "Granddaughter", age: 22, location: "Seattle, Washington" },
    { name: "Jack Smith", relationship: "Grandson", age: 20, location: "Seattle, Washington" },
    { name: "Olivia Johnson", relationship: "Granddaughter", age: 18, location: "Portland, Oregon" },
    { name: "Noah Johnson", relationship: "Grandson", age: 16, location: "Portland, Oregon" }
  ],
  sources: [
    "Oregon Death Index, 2023",
    "The Oregonian Obituaries, January 9-10, 2023",
    "Social Security Death Index",
    "Portland Community Church Records"
  ]
};

const RecordDetail = () => {
  const { id } = useParams();
  
  // In a real application, we would fetch the specific record based on the ID
  const record = mockRecord;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/results" className="text-brand-600 hover:underline mb-6 inline-block">
          ← Back to search results
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold">
                {record.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6">
                <div>
                  <div className="text-sm text-gray-500">Age</div>
                  <div>{record.age}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date of Birth</div>
                  <div>{record.dob}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Birth Place</div>
                  <div>{record.birthplace}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date of Death</div>
                  <div>{record.dod}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Place of Death</div>
                  <div>{record.deathplace}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Last Residence</div>
                  <div>{record.lastResidence}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Obituary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line">
                {record.obituary}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Funeral Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Service</div>
                  <div>{record.funeral.service}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Location</div>
                  <div>{record.funeral.location}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Arrangements</div>
                  <div>{record.funeral.arrangements}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Related Family Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {record.relatives.map((relative, index) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <div className="font-medium">{relative.name}</div>
                      <div className="text-sm text-gray-500">{relative.relationship}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {relative.age}, {relative.location}
                    </div>
                    {index < record.relatives.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4 bg-brand-600 hover:bg-brand-700">
                View Family Connections
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {record.sources.map((source, index) => (
                  <li key={index} className="text-sm">{source}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Need more information?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our premium reports include additional historical records, family connections, and more.
              </p>
              <Button className="w-full bg-brand-600 hover:bg-brand-700">
                Get Full Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecordDetail;
