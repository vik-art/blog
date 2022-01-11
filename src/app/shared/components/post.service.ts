import { keyframes } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, mapTo, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FbCreateResponse, Post } from "./interfaces";

@Injectable({
    providedIn: 'root',
})

export class PostService {
    constructor(private http: HttpClient) { }
    
    create(post: Post): Observable<any> {
        return this.http.post(`${environment.fbDBUrl}/posts.json`, post)
            .pipe(mapTo((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name,
                    date: new Date()
                }
        }))
    }
    getAll(): Observable<any> {
        return this.http.get(`${environment.fbDBUrl}/posts.json`)
            .pipe(
                map((response: {[key: string]: any}) => {
                    return Object
                        .keys(response)
                        .map(key => ({
                    ...response[key],
                        id: key,
                        date: new Date(response[key].date)
                }))
            })
        )
    }
}