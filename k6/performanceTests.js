import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    http.get('http://vps.qvistgaard.me:9888/api/post/list/All/Post');
    sleep(1);
}