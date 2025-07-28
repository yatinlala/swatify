from http import client
import json
import os
from flask import Flask, request, redirect, g, render_template, url_for, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time


basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

app.secret_key = <nope>
app.config['SESSION_COOKIE_NAME'] = 'User cookie'
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


TOKEN_INFO = "token_info"
HOST_IP_ADDRESS = '127.0.0.1'
HOST_PORT = 8080

#  Client Keys
CLIENT_ID = <nope>
CLIENT_SECRET = <nope>

# Spotify OAuth Object
def create_spotify_oauth():
    return SpotifyOAuth(
        client_id = <nope>
        client_secret = <nope>
        redirect_uri = url_for('authorize', _external=True),
        scope="playlist-modify-public playlist-modify-private user-library-read playlist-read-private user-top-read user-read-recently-played"
    )

# Database stuff
db = SQLAlchemy(app)

# class Student(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     firstname = db.Column(db.String(100), nullable=False)
#     lastname = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(80), unique=True, nullable=False)
#     age = db.Column(db.Integer)
#     created_at = db.Column(db.DateTime(timezone=True),
#                            server_default=func.now())
#     bio = db.Column(db.Text)
#
#     def __repr__(self):
#         return f'<Student {self.firstname}>'

class User(db.Model):
    #id = db.Column(db.Integer, primary_key=True)
    uri = db.Column(db.String(200), primary_key=True)
    #first table will hold the user date
    #which is a table with a collumn for id
    #and a column for the json that holds that data
    data = db.Column(db.String(500), nullable=False)
    #ive no idea how big the jsons can be so I just put 500 
    #chars as a guess
    toptracks = db.Column(db.String(500), nullable=False)

class Songs(db.Model):
    #id = db.Column(db.Integer, primary_key=True)
    id = db.Column(db.String(200), primary_key=True)
    #first table will hold the user date
    #which is a table with a collumn for id
    #and a column for the json that holds that data
    data = db.Column(db.String(500), nullable=False)
    #ive no idea how big the jsons can be so I just put 500 
    #chars as a guess
    rank = db.Column(db.Integer, nullable=False)

class Artist(db.Model):
    id = db.Column(db.String(200), primary_key=True)
    data = db.Column(db.String(500), nullable=False)
    rank = db.Column(db.Integer, nullable=False)
    


### Home Page ###
@app.route("/")
def index():
    return render_template('index.html')


### Spotify connection request ###
@app.route("/login")
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)


### Spotify authorization endpoint ###
@app.route("/authorize")
def authorize():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    try:
        token_info = sp_oauth.get_access_token(code)
    # Returns to index page if authorization fails
    except:
        print("access denied")
        return redirect(url_for('index', _external=False))
    session["token_info"] = token_info
    # Redirects to dashboard on valid authorization
    return redirect(url_for('dashboard',_external=False))


### Log out endpoint ###
@app.route("/logout")
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect(url_for('index', _external=False)) # Returns to index page


### Dashboard page ###
@app.route("/dashboard/", methods=['GET','POST'])
def dashboard():
    # Checks that token is valid (authorized)
    
    session["token_info"], authorized = get_token()
    session.modified = True
    if not authorized:
        return redirect(url_for('index', _external=False))
    sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))

    # Parses through top-tracks API to obtain top 20 song titles and images
    searchls = []
    text = 'a'
    if request.method == "POST":
        text = request.form['query']
        searchls = search(sp, text)
        print(text)
        #return ('', 204)

    #adding to database
    # db.drop_all()
    db.create_all()

    # new_user = User(
    #     uri=str(sp.current_user()['id']), 
    #     data=json.dumps(sp.current_user()), 
    #     toptracks=json.dumps(sp.current_user_top_tracks(limit=20, offset=0)['items']))
    # db.session.add(new_user)
    # db.session.commit()
    print('\n\n\n\n\n\n\n\n\n\n\n\n\n')
    print('asdf')
    #print(User.query.all())
    #print(sp.current_user()['id'])
    #print(User.query.filter_by(uri=str(sp.current_user()['id'])).all())
    print('\n\n\n\n\n\n\n\n\n\n\n\n\n')

    if User.query.filter_by(uri=str(sp.current_user()['id'])).all() == []:
        #if the id is not in the database, add it
        new_user = User(
            uri=str(sp.current_user()['id']), 
            data=json.dumps(sp.current_user()), 
            toptracks=json.dumps(sp.current_user_top_tracks(limit=20, offset=0)['items']))
        db.session.add(new_user)
    
        #db.session.add(User(id='17969', data=str(sp.current_user())))
        db.session.commit()

    gettoptracks(sp, 10)
    gettopartists(sp, 10)
    user_info = getuserinfo(sp)
    toptracks = gettoptracksglobal()
    topartists = gettopartistsglobal()
    yyy = Artist.query.order_by(Artist.rank).all()
    print("here")
    print(len(yyy))
    #print(yyy)

    print('\n\n\n\n\n\n\n\n')
    artistsls = sp.current_user_top_artists(limit=10, offset=0)['items']
    print(artistsls)
    #topartists = gettopartistsglobal()
    highlightTrack = getTrack(sp, "6upnye9Xyw6VuhX49Fpm6j")
    devTrack = getTrack(sp, "0GNVXNz7Jkicfk2mp5OyG5")
    global lastinput
   
    return render_template('dashboard.html', toptracks=toptracks, topartists=topartists, highlightTrack=highlightTrack, devTrack=devTrack, user=user_info, searchls=searchls, lastinput=lastinput)


#@app.route("/dashboard/", methods=['GET','POST'])
#def searchItems():
   # text = 'hehehe'
    # Checks that token is valid (authorized)
    #session["token_info"], authorized = get_token()
   # session.modified = True
   # if not authorized:
    #    return redirect(url_for('index', _external=False))
    #sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))

    # Parses through top-tracks API to obtain top 20 song titles and images
   # searchls = []
    #if request.method == "POST":
       #text = request.form['query']
        #searchls = search(sp, text)
       # print(text)
       # return (text)
    #return (text)

@app.route("/leaderboards")
def leaderboard():
    # Checks that token is valid (authorized)
    session["token_info"], authorized = get_token()
    sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))

    # Parses through top-tracks API to obtain top 20 song titles and images
    user_info = getuserinfo(sp)
    toptracks = gettoptracksglobal()
    topartists = gettopartistsglobal()
    topSupers = getSuperlatives(toptracks, sp)
    return render_template('leaderboard.html', toptracks=toptracks, topartists=topartists, user=user_info, topSupers=topSupers)

@app.route("/recommendations")
def recommendations():
    # Checks that token is valid (authorized)
    session["token_info"], authorized = get_token()
    session.modified = True
    if not authorized:
        return redirect(url_for('index', _external=False))
    sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))

    # Parses through top-tracks API to obtain top 20 song titles and images
    user_info = getuserinfo(sp)
    return render_template('recommendations.html', user=user_info)

@app.route("/about")
def about():
    session["token_info"], authorized = get_token()
    session.modified = True
    if not authorized:
        return redirect(url_for('index', _external=False))
    sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))

    user_info = getuserinfo(sp)
    return render_template('aboutus.html', user=user_info)


@app.route("/user")
def user():
    session["token_info"], authorized = get_token()
    session.modified = True
    if not authorized:
        return redirect(url_for('index', _external=False))
    sp = spotipy.Spotify(auth=session.get('token_info').get('access_token'))

    user_info = getuserinfo(sp)
    toptracks = gettoptracks(sp, 20)
    topartists = gettopartists(sp, 20)
    topSupers = getSuperlatives(toptracks, sp)


    return render_template('userstats.html', toptracks=toptracks, topartists=topartists, user=user_info, topSupers=topSupers)



# --------------- FUNCTIONS --------------- #

# gets a valid token for user
def get_token():
    token_valid = False
    token_info = session.get("token_info", {})

    # Checking if the session already has a token stored
    if not (session.get('token_info', False)):
        token_valid = False
        return token_info, token_valid

    # Checking if token has expired
    now = int(time.time())
    is_token_expired = session.get('token_info').get('expires_at') - now < 60

    # Refreshing token if it has expired
    if (is_token_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(session.get('token_info').get('refresh_token'))

    token_valid = True
    return token_info, token_valid


# parses spotify api using user input and returns top 10 results - [title, image, playback URL]
lastsearch = 'a'
lastinput = ''
def search(sp, q):
    global lastsearch
    global lastinput
    results = []
    lastinput = q
    if (q=="" or q.isspace()):
        q = lastsearch
    lastsearch = q
    print("last input: " + lastinput)
    ls = sp.search(q, limit=10, offset=0, type="track", market=None)['tracks']['items']
    for idx, item in enumerate(ls):
        #print(item)    # debugging print
        print("\n\n")   # statements
        track = item
        img = track['album']['images'][0]['url']
        title = track['name']
        artist = track['album']['artists'][0]['name']
        playback = track['preview_url']
        id = track['id']
        tracklink = track['external_urls']['spotify']
        artistlink = track['album']['artists'][0]['external_urls']['spotify']
        print("the id is: " + id)
        print("artistlink is " + artistlink)
        print("tracklink is " + tracklink)
        song = [title, img, playback, id, artist, tracklink, artistlink]
        if song not in results:
            results += [song]
    return results


# gets user name and profile picture - returns array [username, image]
def getuserinfo(sp):
    username = sp.current_user()['display_name']
    try:
        user_pfp = sp.current_user()['images'][0]['url']
    except:
        user_pfp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    user_info = [username, user_pfp]
    return user_info


#returns array of top tracks based on index input from user - returns [title, image]
def gettoptracks(sp, n):
    results = []
    trackls = sp.current_user_top_tracks(limit=n, offset=0)['items']
    for idx, item in enumerate(trackls):

        track = item
       # print(item)    # debugging print
        #print("\n\n")   # statements
        t_img = track['album']['images'][0]['url']
        val = track['name'] + " - " + track['album']['artists'][0]['name']
        title = track['name']
        artist = track['album']['artists'][0]['name']
        id = track['id']
        song = [val, t_img, id]

        if Songs.query.filter_by(id=str(track['id'])).all() == []:
            newsong = Songs(
            id=str(id), 
            data=json.dumps(track), 
            rank=1)
            db.session.add(newsong)
        else:
            newsong = Songs.query.filter_by(id=str(track['id'])).first()
            newsong.rank += 1
            
        db.session.commit()
        #print(Songs.query.all())
        tracklink = track['external_urls']['spotify']
        playback = track['preview_url']
        song = [val, t_img, id, tracklink, playback, title, artist]
        if song not in results:
            results += [song]
    return results


#returns array of top songs and their respective superlatives - array of [name, img, playback, superlative_val]
def getSuperlatives(toptracks, sp):
    trackIDs = []
    for track in toptracks:
        trackIDs += [track[2]]

    analysis = sp.audio_features(trackIDs)
    fullData = []
    for x in range(20):
        title = toptracks[x][5]
        artist = toptracks[x][6]
        image = toptracks[x][1]
        dance = float(analysis[x]['danceability'])
        happy = float(analysis[x]['valence'])
        energy = float(analysis[x]['energy'])
        tempo = float(analysis[x]['tempo'])
        playback = toptracks[x][4]
        tracklink = toptracks[x][3]
        songData = {'title':title, 'artist':artist, 'image':image, 'playback':playback, 'tracklink':tracklink, 'dance':dance, 'happy':happy, 'energy':energy, 'tempo':tempo}
        print(songData)
        print("\n\n\n")
        fullData += [songData]
    #print(fullData)

    topDance = {'title':toptracks[0][5], 'artist':toptracks[0][6], 'image':toptracks[0][1], 'dance':float(analysis[0]['danceability']), 'playback':toptracks[0][4], 'tracklink':toptracks[0][3]}
    topHappy = {'title':toptracks[0][5], 'artist':toptracks[0][6], 'image':toptracks[0][1], 'happy':float(analysis[0]['valence']), 'playback':toptracks[0][4], 'tracklink':toptracks[0][3]}
    topEnergy = {'title':toptracks[0][5], 'artist':toptracks[0][6], 'image':toptracks[0][1], 'energy':float(analysis[0]['energy']), 'playback':toptracks[0][4],'tracklink':toptracks[0][3]}
    topTempo = {'title':toptracks[0][5], 'artist':toptracks[0][6], 'image':toptracks[0][1], 'tempo':float(analysis[0]['tempo']), 'playback':toptracks[0][4], 'tracklink':toptracks[0][3]}

    for data in fullData:
        if data['dance'] > topDance['dance']:
            topDance['title'] = data['title']
            topDance['artist'] = data['artist']
            topDance['playback'] = data['playback']
            topDance['tracklink'] = data['tracklink']
            topDance['image'] = data['image']
            topDance['dance'] = data['dance']
        if data['happy'] > topHappy['happy']:
            topHappy['title'] = data['title']
            topHappy['artist'] = data['artist']
            topHappy['playback'] = data['playback']
            topHappy['tracklink'] = data['tracklink']
            topHappy['image'] = data['image']
            topHappy['happy'] = data['happy']
        if data['energy'] > topEnergy['energy']:
            topEnergy['title'] = data['title']
            topEnergy['artist'] = data['artist']
            topEnergy['playback'] = data['playback']
            topEnergy['tracklink'] = data['tracklink']
            topEnergy['image'] = data['image']
            topEnergy['energy'] = data['energy']
        if data['tempo'] > topTempo['tempo']:
            topTempo['title'] = data['title']
            topTempo['artist'] = data['artist']
            topTempo['playback'] = data['playback']
            topTempo['tracklink'] = data['tracklink']
            topTempo['image'] = data['image']
            topTempo['tempo'] = data['tempo']

    topSupers = {'topDance':topDance, 'topHappy':topHappy, 'topEnergy':topEnergy, 'topTempo':topTempo}
    print(topSupers)
    print("\n\n")
    print(topSupers['topDance']['playback'])
    print(topSupers['topHappy']['image'])
    
    return topSupers


#returns array of top artists based on index input from user - returns [name, image]
def gettopartists(sp, n):
    results = []
    artistsls = sp.current_user_top_artists(limit=n, offset=0)['items']
    print(artistsls)
    for idx, item in enumerate(artistsls):
        artist = item
        print(artist['images'][0]['url'])
        print(artist['name'])
        print("\n\n")
        a_img = artist['images'][0]['url']
        name = artist['name']
        artist_info = [name, a_img]
        print("intopartists")
        print(Artist.query.filter_by(id=str(item['id'])).all())
        if Artist.query.filter_by(id=str(item['id'])).all() == []:
            newart = Artist(
            id=str(item['id']), 
            data=json.dumps(item), 
            rank=1)
            db.session.add(newart)
            db.session.commit()
        else:
            newsong = Artist.query.filter_by(id=str(item['id'])).first()
            print(newsong.rank)
            newsong.rank += 1


        artistlink = artist['external_urls']['spotify']
        artist_info = [name, a_img, artistlink]
        if artist_info not in results:
            results += [artist_info]
    return results

def getTrack(sp, id):
    track = sp.track(id)
    img = track['album']['images'][0]['url']
    title = track['name']
    artist = track['album']['artists'][0]['name']
    playback = track['preview_url']
    tracklink = track['external_urls']['spotify']
    trackData = {'title':title, 'artist':artist, 'image':img, 'playback':playback, 'tracklink':tracklink}
    return trackData


def gettopartistsglobal():
    yyy = Artist.query.order_by(Artist.rank).all()
    print("this is yyy")
    print(yyy)
    artist_list = []
    for idx, item in enumerate(yyy):
        artist = item
        print(item.data)
        print("\n\n")
        
        track = json.loads(item.data)
        print(item.data)    # debugging print
        print("\n\n")   # statements
        id = track['id']
        a_img = track['images'][0]['url']
        name = track['name']
        artistlink = track['external_urls']['spotify']
        artist_info = [name, a_img, artistlink]
        if artist_info not in artist_list:
            artist_list += [artist_info]
    return artist_list

def gettoptracksglobal():
    results = []
    trackls = Songs.query.order_by(Songs.rank).all()

    for idx, item in enumerate(trackls):

        
        track = json.loads(item.data)
       # print(item)    # debugging print
        #print("\n\n")   # statements
        t_img = track['album']['images'][0]['url']
        val = track['name'] + " - " + track['album']['artists'][0]['name']
        id = track['id']
        title = track['name']
        artist = track['album']['artists'][0]['name']
        song = [val, t_img, id]

        
            
        #print(Songs.query.all())
        tracklink = track['external_urls']['spotify']
        playback = track['preview_url']
        song = [val, t_img, id, tracklink, playback, title, artist]

        #song = [val, t_img, id, tracklink, playback]
        if song not in results:
            results += [song]
    return results



if __name__ == '__main__':
    app.run(host='127.0.0.1')
