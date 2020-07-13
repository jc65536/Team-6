import java.io.*;
import java.net.*;

public class YelpSearch {
    public static void main(String[] args) throws Exception {
        // search yelp here
        URL u = new URL("https://api.yelp.com/v3/businesses/search?location=NYC");
        HttpURLConnection con = (HttpURLConnection) u.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Authorization", "Bearer YELP_API_KEY");
        int responseCode = con.getResponseCode();
        System.out.println(responseCode);
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer response = new StringBuffer();

			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();

			// print result
			System.out.println(response.toString());

    }
}