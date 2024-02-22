package main
import "fmt"

func main() {
    var a int
    fmt.Scanf("%d", &a)

    for a!=10 {
        fmt.Println(a)
        fmt.Scanf("%d", &a)
    }
}