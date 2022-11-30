

function MailTest() {
    const add_textbox = () => {
        const box = document.getElementById("box");
        const newP = document.createElement("tr");

        newP.innerHTML = "<th>메일 주소</th><td><input type='text' name='address' ><input type='button' value='삭제' onclick='opt_remove(this)'></td>";
        box.parentNode.insertBefore(newP, box.nextSibling);
    }

    const add_textbox2 = () => {
        const box = document.getElementById("box2");
        const newP = document.createElement("tr");

        newP.innerHTML = "<th>참조 메일 주소</th><td><input type='text' name='ccAddress' ><input type='button' value='삭제' onclick='opt_remove2(this)'></td>";
        box.parentNode.insertBefore(newP, box.nextSibling);
    }

    const opt_remove = (obj) => {
        document.getElementById('box').parentElement.removeChild(obj.parentElement.parentElement);
    }
    const opt_remove2 = (obj) => {
        document.getElementById('box2').parentElement.removeChild(obj.parentElement.parentElement);
    }


    return (
        <>
            <h1>템플릿 메일 보내기</h1>
            <div class="container">
                <form th:action="@{/mail/template/send}" method="post">
                    <table>
                        <tr id="box" class="form-group">
                            <td>메일 주소</td>
                            <td>
                                <input type="text" class="form-control" name="address" placeholder="이메일 주소를 입력하세요"/>
                            </td>
                            <td>
                                <input type="button" class="form-control" value="추가" onclick="add_textbox(this)"/>
                            </td>
                        </tr>
                        <tr id="box2" class="form-group">
                            <td>참조 메일 주소</td>
                            <td>
                                <input type="text" class="form-control" name="ccAddress" placeholder="참조 수신인을 입력하세요"/>
                            </td>
                            <td>
                                <input type="button" class="form-control" value="추가" onclick="add_textbox2(this)"/>
                            </td>
                        </tr>
                        <tr class="form-group">
                            <td>제목</td>
                            <td>
                                <input type="text" class="form-control" name="title" placeholder="제목을 입력하세요"/>
                            </td>
                        </tr>
                        <tr class="form-group">
                            <td>템플릿 이름</td>
                            <td>
                                <input type="text" class="form-control" name="template" placeholder="템플릿 이름을 입력하세요"/>
                            </td>
                        </tr>
                    </table>
                    <button class="btn btn-default">발송</button>
                </form>
            </div>
        </>
    )
}

export default MailTest
