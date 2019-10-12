import React from 'react'
import {auth, firebase,storage} from '../lib/firebase';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  };

  handleUpload = () => {
    const {image} = this.state;
    if (image) {
      const uploadTask = storage.ref('profile/'+this.props.email+'/'+image.name).put(image);

      uploadTask.on("state_changed", snapshot => {

        // progress function ...
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, error => {
        // Error function ...
        //
        console.log(error);
      }, () => {
        // complete function .



        storage.ref("profile/"+this.props.email).child(image.name).getDownloadURL().then(url => {
          this.setState({url},()=>{
            this.props.doneUploading();
          });
        });

      });
    } else {
      alert("Please choose a file")
    }


  };

  render() {
    return (


      <div className="col-md-12 text-center">


          <h1>One more thing...Upload a profile picture</h1>


        <div className="image-upload text-center">
          <label htmlFor="file-input">
  <img src="/static/images/placeHolder.png" className="profile-img"/>
</label>

            <input type="file" onChange={this.handleChange} className="form-control-file" required id="file-input"/>
        </div>

      <div className="progress">
        <div style={{width: this.state.progress+'%'}} aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100" className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar"></div>
      </div>



      <button onClick={this.handleUpload} className="btn">
        Upload
      </button>
        </div>


  );
  }
}

export default ImageUpload;
