import os
import Skills_extract

from flask import *

app = Flask(__name__)


@app.route('/')
def home_page():
    return render_template('index.html')


@app.route('/results', methods=['GET', 'POST'])
def results_skills():
    if request.method == 'POST':
        f_path = request.files['file'].filename
        path = r"D:\MajorProject\Resumes\\" + f_path

        split_tup = os.path.splitext(path)

        # extract the extension
        file_extension = split_tup[1]

        if file_extension == '.pdf':
            text = ''
            for page in Skills_extract.extract_text_from_pdf(path):
                text += ' ' + page
            resume_text = text.lower()
        else:
            resume_text = Skills_extract.extract_text_from_doc(
                path).lower()
    output_skills = Skills_extract.extract_skills(resume_text)

    return render_template('results.html', skills=output_skills)


if __name__ == '__main__':
    app.run(debug=True)
