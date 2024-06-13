import { createClient } from "@sanity/client";
import { sanityClientConfig } from "@/components/SanityClientConfig";

export async function POST(request: Request) {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const eventId = params.get('event_id') as string;
    /*
    const res = await request.json();
    return Response.json({ res })
    */
    const formData = await request.formData();

    const file = formData.get("file");
    if (!file) {
        return Response.json({ error: "No files received." }, { status: 400 });
    }
    var filename = '';
    if (typeof file !== 'string') {
        //const buffer = Buffer.from(await file.arrayBuffer());
        //filename =  file.name.replaceAll(" ", "_");

        //https://stackoverflow.com/questions/76725154/distinguish-entry-in-formdata-file-or-string

        const sanityClient = createClient(sanityClientConfig);
        sanityClient.assets
            .upload('image', file)
            .then(imageAsset => {
                return sanityClient
                  .patch(eventId)
                  .set({
                    mainImage: {
                      _type: 'image',
                      asset: {
                        _type: "reference",
                        _ref: imageAsset._id
                      }
                    }
                  })
                  .commit()
              })
              .then(() => {
                console.log("Done!");
              })
    }
    return Response.json({ filename }, { status: 200 });
    
}
    